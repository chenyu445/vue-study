
module.exports = function (server) {
  var io = require('socket.io').listen(server)
  io.on('connection', function (socket) {
        // 获取用户当前的url，从而截取出房间id
    var url = socket.request.headers.referer
    var splitArr = url.split('/')
    var roomid = splitArr[splitArr.length - 1] || 'index'
    var user = ''
    var roomUser = {}
    socket.on('join', function (username) {
      user = username
            // 将用户归类到房间
      if (!roomUser[roomid]) {
        roomUser[roomid] = []
      }
      roomUser[roomid].push(user)
      socket.join(roomid)
      socket.to(roomid).emit('sys', user + '加入了房间')
      socket.emit('sys', user + '加入了房间')
    })

        // 监听来自客户端的消息
    socket.on('message', function (msg) {
            // 验证如果用户不在房间内则不给发送
      if (roomUser[roomid].indexOf(user) < 0) {
        return false
      }
      socket.to(roomid).emit('new message', msg, user)
      socket.emit('new message', msg, user)
    })

        // 关闭
    socket.on('disconnect', function () {
            // 从房间名单中移除
      socket.leave(roomid, function (err) {
        if (err) {
          log.error(err)
        } else {
          var index = roomUser[roomid].indexOf(user)
          if (index !== -1) {
            roomUser[roomid].splice(index, 1)
            socket.to(roomid).emit('sys', user + '退出了房间')
          }
        }
      })
    })
  })
}
