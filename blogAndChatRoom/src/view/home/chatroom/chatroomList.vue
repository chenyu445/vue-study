<template lang="pug">
  div.charroom    
    .header
      h1 Welcome to chatRoom
    .roomList
      ul
        li
          el-row
            el-col(:span="2") Index
            el-col(:span="14") Name
            el-col(:span="4") Members
            el-col(:span="4") Action
        li(v-for='(room,index) in list')
          el-row
            el-col(:span="2") {{ index + 1}}
            el-col(:span="14") 
              router-link(:to="'/chatroom/'+room.router") {{room.name}}
            el-col(:span="4") {{room.member}}
            el-col(:span="4") 
              router-link(:to="'/chatroom/'+room.router") Enter
</template>

<script>
export default {
  name: 'chatRoom',
  data () {
    return {
      list: [
        {
          name: '今晚打老虎',
          id: '001',
          router: 'chat01',
          member: 11
        },
        {
          name: '老虎不让打',
          id: '002',
          router: 'chat02',
          member: 10
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .charroom{     
    .header{
        width: 100%;
        height: 40px;
        background-color: #324057;
        overflow: hidden;
        padding: 0 10px;
        h1{
          color:#fff;
          line-height: 40px;
          margin: 0; 
        }
      }
    .roomList{
      padding:0 10px;
    }
  }
  
</style>
