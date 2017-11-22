<template lang="pug">
  div.charroom.full-height     
    .header
      h1 Welcome to chatRoom
    el-row.roomContent.full-height      
      el-col.full-height(:span="6") left side 用户列表
       
       ul.userlist          
        li(v-for="(user , index) in memberList")
          .userindex {{ index + 1 }}
          img.userIcon(:src="user.icon")
          .username {{ user.name}}
          .action 详情
      el-col.full-height(:span="18") right side
</template>

<script>
export default {
  name: 'chatRoom',
  data () {
    return {
      roomInfo: {
        name: '今晚打老虎',
        id: '001',
        members: 11
      },
      memberList: [
        {
          name: '一只小飞龙，',
          id: 'aaa',
          sex: 'male',
          icon: ''
        }, {
          name: '两只小飞龙，',
          id: 'aaa',
          sex: 'male',
          icon: ''
        }, {
          name: '三只小飞龙，',
          id: 'aaa',
          sex: 'male',
          icon: ''
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .charroom{ 
    position: relative;    
    .header{
        width: 100%;
        height: 40px;
        background-color: #324057;
        overflow: hidden;
        padding: 0 10px;
        position:absolute;
        z-index: 1;
        top: 0;
        left: 0;
        h1{
          color:#fff;
          line-height: 40px;
          margin: 0; 
        }
      }
    .roomContent{
      width:100%;
      float: left;
      // top: 0px;
      padding:0 10px;
      padding-top:40px;
      >div:first-of-type{
        border-right:1px solid #324057
      }            
    }
    
  }
  
</style>
