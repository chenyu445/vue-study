/**
 * Created by diamondwang on 2016/8/11.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
var url = "http://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=%E7%BE%8E%E5%A5%B3";
console.log('start============================')

http.get(url,function(res){
    var data = "";
    res.on('data',function(chunk){
        data += chunk;
    });
    res.on('end',function(){
        //src="http://ww1.sinaimg.cn/bmiddle/0060lm7Tgw1f6pkl2264uj30dw0dwmyx.jpg" /> 需要匹配
        var imgs = []; //使用数组来保存图片的url
        //var reg = new RegExp('src="(http:\/\/[a-zA-Z0-9/.]+)"\s*\/>','g');
        var reg = /src="(http:\/\/[a-zA-Z0-9/.]+)"\s*\/>/g;
        var temp;
        while( (temp = reg.exec(data)) != null  ) {
            imgs.push(temp[1]); //把子模式中的内容保存起来，它就是图片的url
        }
        //console.log(imgs);
        imgs.forEach(function(item){
            downPic(item);
        });
    });
});

//封装一个函数，用于下载指定url的图片
function downPic(url){
    //http://ww2.sinaimg.cn/large/679ee809gw1f6nhbfgw7qj20go0nzwgw.jpg
    //利用path模块，完成文件名的获取
    var filename = path.join("images",path.basename(url));
    http.get(url,function(res){
        res.setEncoding('binary');
        var data = "";
        res.on('data',function(chunk){
            data += chunk;
        });
        res.on('end',function(){
            fs.writeFile(filename,data,"binary",function(err){
                if (err) throw err;
                console.log('下载图片成功');
            });
        });
    });
}fs
