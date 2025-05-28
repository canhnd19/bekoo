<template>
  <div class="app-container">
    <ChatSidebar
      :is-loading="isLoading"
      :list-user-chat="listUserChat"
      :top-favorites="topFavorites"
      :search-query="searchQuery"
      @click-user="handleClickUser"
      @update:search-query="(name) => fetchUserChatList(name)"
    />
    <ChatMain v-model:message-send="newMessage" :user-info="userInfo" :chat="currentChat" @send="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import type { IChat, IChatHistory, IListUserChat, IMessageHistory } from '@/types/message.types'

import ChatMain from '../components/ChatMain.vue'
import ChatSidebar from '../components/ChatSidebar.vue'

const searchQuery = ref('')
const newMessage = ref('')
const isLoading = ref(false)

const listUserChat = ref<IChat[]>([])
const currentChat = ref<IMessageHistory[]>([])
const userInfo = ref({
  id: '',
  name: '',
  linkAvatar: '/images/avatar-user-default.png'
})

const handleClickUser = (chat: IChat) => {
  console.log('🚀 ~ handleClickUser ~ chat:', chat)
  const chatMessage = {
    requestType: 'Get-Chat-History',
    data: {
      userId: chat.userId
    }
  }
  socket.send(chatMessage)
}

socket.addListener('message', (data: IListUserChat) => {
  listUserChat.value = data.value
  isLoading.value = false
  // currentChat.value = data
})
socket.addListener('chat-history', (data: IChatHistory) => {
  console.log('🚀 ~ socket.addListener ~ data:', data)
  currentChat.value = data.value
})

const topFavorites = computed(() => {
  return listUserChat.value.map((item) => ({
    id: item.userId,
    avatar: item.avatar || '/images/avatar-user-default.png'
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
const fetchUserChatList = (name = '') => {
  isLoading.value = true
  searchQuery.value = name
  socket.send({
    requestType: 'Get-All-Chat',
    data: { name }
  })
}

fetchUserChatList()
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  height: 100%;
  margin: 0 auto;
  border-radius: 8px;
}
</style>
