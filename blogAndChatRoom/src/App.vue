<template lang="pug">
  div#app
    router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
@import '~normalize.css/normalize.css';// normalize.css 样式格式化
// @import url("./assets/iconfont/iconfont.css"); //图标字体
  html , body , #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    height: 100%;
    width: 100%;
    min-width: 1440px;
    font-size: 12px;
    color: #333;
  }

  // [class^="el-icon-MV"], [class*="el-icon-MV"] {
  //   font-family:"iconfont" !important;
  //   font-size:16px;
  //   font-style:normal;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  // }
  a{
    text-decoration:none;
  }
  *{
    box-sizing: border-box;
  }
  *{
    margin:0;
    padding:0;
  }
  .pull-left{
    float: left;
  }
  .pull-right{
    float: right;
  }
  .clearfix{
    clear: both;
  }
  .full-height{
    height: 100%;
  }
  .margin-right-10{
    margin-right: 10px;
  }
</style>
