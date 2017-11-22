import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/view/HelloWorld'
import ChatRoom from '@/view/home/chatroom/chatroom'
import chatRoomList from '@/view/home/chatroom/chatroomList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/chatroom',
      name: 'chatRoomList',
      component: chatRoomList
    },
    {
      path: '/chatroom/:roomid',
      name: 'chatRoom',
      component: ChatRoom
    }
  ]
})
