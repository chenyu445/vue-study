var  http = require('http')
  , express = require('express')
  , path = require('path')
  , net = require('net')
  , app = express()
  , fs = require('fs')
  // , readLine = require('readline')
  , folderName = '';
// startTest()





//执行完成接口

var PORT = process.env.PORT || 9002

app.use(express.static(path.join(__dirname, '/public')))

var server = http.createServer(app)

server.listen(PORT)
console.info('Listening on port %d', PORT)
