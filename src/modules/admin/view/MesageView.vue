<template>
  <div class="app-container">
    <ChatSidebar
      :is-loading="isLoading"
      :list-message="listMessage"
      :top-favorites="topFavorites"
      :search-query="searchQuery"
      @click-user="handleClickUser"
      @update:search-query="searchQuery = $event"
    />
    <ChatMain v-model:message-send="newMessage" :user-info="userInfo" :chat="currentChat" @send="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import { apiChat } from '@/services'

import type { IMessage, IMessageHistory } from '@/types/message.types'
import type { ChatMessage } from '@/types/socket.types'
import type { IUser } from '@/types/user.types'

import ChatMain from '../components/ChatMain.vue'
import ChatSidebar from '../components/ChatSidebar.vue'

const searchQuery = ref('')
const newMessage = ref('')
const isLoading = ref(false)
const query = ref({
  'search-word': ''
})

const listMessage = ref<IMessage[]>([])
const currentChat = ref<IMessageHistory[]>([])
const userInfo = ref({
  id: '',
  name: '',
  linkAvatar: '/images/avatar-user-default.png'
})

// const chatHistory = {
//   id: '1',
//   name: 'Emily Brontë',
//   avatar: '/images/avatar-user-default.png',
//   messages: [
//     {
//       id: '1' (Hiện tại chưa có nhưng nếu sau này muốn làm reply thì có thể thêm vào),
//       sender: 0 || 1,
//       content: "Hi, I need help with my project. I'm having trouble with the layout design.",
//       time: 1691234567890,
//     },
//     {
//       id: '2',
//       sender: 0 || 1,
//       text: "Of course! What's the issue?",
//       time: 1691234567890,
//     },
//   ]
// }

const handleClickUser = (user: IUser) => {
  userInfo.value = user
  const chatMessage: ChatMessage = {
    type: 1,
    senderId: user.id,
    adminStatus: 'ON',
    content: 'GET MESSAGE',
    timestamp: new Date().getTime()
  }
  socket.send(chatMessage)
}

socket.addListener('message', (data: IMessageHistory[]) => {
  currentChat.value = data
})

const topFavorites = computed(() => {
  return listMessage.value.map((item) => ({
    id: item.userResponse.id,
    avatar: item.userResponse.linkAvatar || '/images/avatar-user-default.png'
  }))
})

const sendMessage = () => {
  if (newMessage.value.trim()) {
    currentChat.value.push({
      content: newMessage.value,
      time: new Date().getTime(),
      type: 0
    })
    newMessage.value = ''
  }
}

const getListUserChat = async () => {
  isLoading.value = true
  try {
    const { value } = await apiChat.getListUserChat(query.value)
    listMessage.value = value
    userInfo.value = value[0].userResponse
    const chatMessage: ChatMessage = {
      type: 1,
      senderId: value[0].userResponse.id,
      adminStatus: 'ON',
      content: 'GET MESSAGE',
      timestamp: new Date().getTime()
    }
    socket.send(chatMessage)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

getListUserChat()
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  height: 100%;
  margin: 0 auto;
  border-radius: 8px;
}
</style>
