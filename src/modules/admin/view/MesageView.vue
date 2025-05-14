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
  linkAvatar: ''
})
const handleClickUser = (user: IUser) => {
  console.log('🚀 ~ handleClickUser ~ user:', user)
  userInfo.value = user
  const chatMessage: ChatMessage = {
    type: 1,
    senderId: user.id,
    adminStatus: 'ON',
    content: 'GET MESSAGE',
    timestamp: new Date().getTime()
  }
  console.log('🚀 ~ handleSendMessage ~ chatMessage:', chatMessage)
  socket.send(chatMessage)
}

socket.addListener('message', (data: IMessageHistory[]) => {
  currentChat.value = data
  console.log('🚀 ~ socket.addListener ~  currentChat.value:', currentChat.value)
  console.log('🚀 ~ socket.addListener ~ data:', data)
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
    console.log('🚀 ~ sendMessage ~ currentChat.value.push:', currentChat.value)
  }
}

const getListUserChat = async () => {
  isLoading.value = true
  try {
    const { value } = await apiChat.getListUserChat(query.value)
    listMessage.value = value
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

getListUserChat()
</script>

<style>
.app-container {
  display: flex;
  height: 100%;
  margin: 0 auto;
  border-radius: 8px;
}
</style>
