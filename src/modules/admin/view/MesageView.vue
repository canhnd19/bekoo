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
import type { IChat, IChatHistory, IMessageHistory } from '@/types/message.types'

import ChatMain from '../components/ChatMain.vue'
import ChatSidebar from '../components/ChatSidebar.vue'

const searchQuery = ref('')
const newMessage = ref('')
const isLoading = ref(false)

const listUserChat = ref<IChat[]>([])

const currentChat = ref<IMessageHistory[]>([])
const userInfo = ref({
  id: listUserChat.value[0]?.userId,
  name: listUserChat.value[0]?.name,
  linkAvatar: '/images/avatar-user-default.png'
})

const handleClickUser = (chat: IChat) => {
  const chatMessage = {
    requestType: 'Get-Chat-History',
    data: {
      userId: chat.userId
    }
  }
  userInfo.value = {
    id: chat.userId,
    name: chat.name,
    linkAvatar: chat.avatar || '/images/avatar-user-default.png'
  }

  socket.send(chatMessage)
}

socket.addListener('message', (data: IChatHistory) => {
  if (data.message === 'Get-All-Chat') {
    listUserChat.value = data.value as IChat[]
    socket.send({
      requestType: 'Get-Chat-History',
      data: {
        userId: listUserChat.value[0].userId
      }
    })
  } else if (data.message === 'Get-Chat-History') {
    currentChat.value = data.value as IMessageHistory[]
  }
  userInfo.value = {
    id: listUserChat.value[0].userId,
    name: listUserChat.value[0].name,
    linkAvatar: listUserChat.value[0].avatar || '/images/avatar-user-default.png'
  }
  isLoading.value = false
  // currentChat.value = data
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
      createdBy: 'Hệ thống'
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
