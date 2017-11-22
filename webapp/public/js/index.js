/**
 * Created by damon on 17-6-1.
 */
 var imgData = '';
//页面数据
var url = window.location.hostname;
var tws = new WebSocket('ws://'+url+':9003')
var imgBox = document.querySelector('#imgBox')
var appInfo = new Vue({
  el:'#app'
  , data :{
    imgBoxWidth:0
    ,postItem:0
    ,appInfo:{
        appLogo:'images/news.png'
        ,appName :'网易新闻'
        ,appVersion:'andriod 1.1.7'
    }
    ,deviceInfo:{
        brand:'NUBIA Z9 MINI'
        , time:{
            min:28
            ,sec:26
        }
    }
    ,taskStart: false
    ,taskInfo:{
      showTab:'list'         //list  or  tree          
      ,baseLine:''
      ,currentRun:''
      ,lastTime:0
      ,errorStep:0
      ,currentSelect:{}
      ,taskList:[

      ]
    }
    ,mouseOverBox:false
  }
  ,methods:{
    changeTab:function(tab){
      this.taskInfo.showTab = tab
    }
    ,treeFolder:function(task){
      var status = task.open;
      this.taskInfo.taskList.forEach(function(d,i){
        d.open=false;
      })
      this.taskInfo.currentSelect = task
      this.taskInfo.currentRun = task
      task.open = !status;
    }
    ,startTask:function(){
        var that = this;
        var t;
       if(!this.taskStart){
           t = setInterval(function(){
               ++that.taskInfo.lastTime
           },1000)
           tws.send('startTask')
           console.log('task Start')
           that.taskStart = true;
       }else{
           window.alert('task is already start...')
       }
    }
    ,stepClick:function(data){
        console.log(data)
        showTask(this.taskInfo.taskList,data.id)
        // this.taskInfo.taskList.forEach(function(d){
        //     d.open = false;
        // })
        // data.open = true;
        // // this.taskInfo.showTab = 'tree'
        //     showTask
        // this.taskInfo.currentRun = data;
        // this.taskInfo.currentSelect = data;

    }
    ,showBtn:function(e){
      e.target.style.opacity = 1
    }
    ,hideBtn:function(e){
      e.target.style.opacity = 0.6
    }
    ,swipeLeft:function(e){
      var that = this;
      var curItem;
      that.taskInfo.taskList.forEach(function(data){
        if(data.open){
          curItem = data;
        }
      })
      if(curItem.id>0) {
        showTask(that.taskInfo.taskList, curItem.id - 1)
      }
    }
    ,swipeRight:function(e){
      var that = this;
      var curItem;
      that.taskInfo.taskList.forEach(function(data){
        if(data.open){
          curItem = data;
        }
      })
      if(curItem.id< that.taskInfo.length){
        showTask(that.taskInfo.taskList,curItem.id+1)
      }

    }
  }
  ,mounted:function(){
    console.log('mounted')
    var that = this;

    // preData = ''
    tws.onclose=function(){
        console.log('twsonclose', arguments)
    }
    tws.onerror = function(err){
        console.log('error:', err)
    }
    tws.onmessage = function(msg){
        // console.log('twsMSG:',msg.data)
        if(msg.data != 'taskNotStart'){
          var taskData = msg.data
          var folderName = taskData.split('|')[0].replace('public','')
          var taskArray = taskData.split('|')[1].split('\n')
          var taskList =[]
          taskArray.forEach(function(da,n){
            if(da){
              var task = {
                status:'compeleted'
                ,id : da.split(',')[0]
                ,name : da.split(',')[3] || 'step'+da.split(',')[0]
                ,before :folderName+'/'+da.split(',')[1]
                ,after :folderName+'/'+da.split(',')[2]
                ,open :false
                ,lastTime :new Date().Format('yy-MM-dd hh:mm:ss')
                ,time : new Date().Format('yy-MM-dd hh:mm:ss')
              }

              if(n+2 == taskArray.length){
                task.open = true;
              }
              // imgBox.style.right = 0;

              taskList.push(task)
              // appInfo.taskInfo.currentRun= task
              // appInfo.taskInfo.currentSelect= task
            }
            if(da == 'end'){
              clearInterval(t)
            }
          })
          that.postItem = 0;
          that.imgBoxWidth = (taskList.length -1)*210+240
          that.taskInfo.taskList = taskList
        }else{
          console.log('taskNotStart')
        }

    }
    tws.onopen = function(){
        console.log('twsonopen', arguments)
        tws.send('task connection')
    }
  }
})

Vue.nextTick(function(){

  console.log('update')
    var BLANK_IMG =
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

    var canvas = document.getElementById('canvas')
        , g = canvas.getContext('2d')

    // console.log(url)
    var ws = new WebSocket('ws://'+url+':9002', 'minicap')
    ws.binaryType = 'blob'

    ws.onclose = function() {
        console.log('onclose', arguments)
    }

    ws.onerror = function() {
        console.log('onerror', arguments)
    }

    ws.onmessage = function(message) {
        var blob = new Blob([message.data], {type: 'image/jpeg'})
        var URL = window.URL || window.webkitURL
        var img = new Image()
        img.onload = function() {
            console.log(img.width, img.height)
            canvas.width = img.width
            canvas.height = img.height
            g.drawImage(img, 0, 0)
            img.onload = null
            img.src = BLANK_IMG
            img = null
            u = null
            blob = null
        }
        var u = URL.createObjectURL(blob)
        img.src = u
    }

    ws.onopen = function() {
        console.log('onopen', arguments)
        ws.send('1920x1080/0')
    }
})

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function showTask(taskList,index){
    console.log(index)
    taskList.forEach(function(d){
        d.open = false;
    })
    taskList[index].open = true;
    if(taskList.length-index > 2){
        appInfo.postItem = (taskList.length -index-3.5)*210
        // imgBox.setAttribute(':style',imgBox.getAttribute(':style')+';right:-'+(taskList.length-2-index)*240+'px')
        // console.log(imgBox.getAttribute(':style'))
    }
}
