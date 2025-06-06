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
    <ChatMain
      ref="messagesContainer"
      v-model:message-send="newMessage"
      :user-info="userInfo"
      :chat="currentChat"
      :is-load-more="isLoadMore"
      :is-scroll-to-top="isScrollToTop"
      @send="sendMessage"
      @load-more="loadMoreMessage"
    />
  </div>
</template>

<script setup lang="ts">
import type { IChat, IChatHistory, IMessageHistory } from '@/types/message.types'

import getSocket from '@/utils/socket'

import ChatMain from '../components/ChatMain.vue'
import ChatSidebar from '../components/ChatSidebar.vue'

const messagesContainer = ref<InstanceType<typeof ChatMain> | null>(null)
const isLoadMore = ref(false)
const searchQuery = ref('')
const newMessage = ref('')
const isLoading = ref(false)
const isScrollToTop = ref(false)
const listUserChat = ref<IChat[]>([])
const pageIndex = ref(1)

const currentChat = ref<IMessageHistory[]>([])
const userInfo = ref({
  id: listUserChat.value[0]?.userId,
  name: listUserChat.value[0]?.name,
  linkAvatar: '/images/avatar-user-default.png',
  online: 'offline' as 'online' | 'offline'
})

const handleClickUser = (chat: IChat) => {
  const socket = getSocket()
  currentChat.value = []
  const chatMessage = {
    requestType: 'Get-Chat-History',
    data: {
      userId: chat.userId,
      pageIndex: 1,
      pageSize: 20
    }
  }
  userInfo.value = {
    id: chat.userId,
    name: chat.name,
    linkAvatar: chat.urlImage || '/images/avatar-user-default.png',
    online: chat.online
  }
  socket.send(chatMessage)
}

const socket = getSocket()
let removeListener: (() => void) | undefined
onMounted(() => {
  removeListener = socket.addListener('message', (data: IChatHistory) => {
    if (data.message === 'Get-All-Chat') {
      listUserChat.value = data.value as IChat[]
      userInfo.value = {
        id: listUserChat?.value[0]?.userId,
        name: listUserChat?.value[0]?.name,
        linkAvatar: listUserChat?.value[0]?.urlImage || '/images/avatar-user-default.png',
        online: listUserChat?.value[0]?.online
      }
      socket.send({
        requestType: 'Get-Chat-History',
        data: {
          userId: listUserChat?.value[0]?.userId,
          pageIndex: 1,
          pageSize: 20
        }
      })
    } else if (data.message === 'Get-Chat-History') {
      const newMessages = data.value as IMessageHistory[]
      if (pageIndex.value === 1) {
        currentChat.value = newMessages
      } else {
        isScrollToTop.value = true
        isLoadMore.value = true
        currentChat.value = [...newMessages, ...currentChat.value]
        isLoadMore.value = false
      }
      return
    } else if (data.message === 'Chat') {
      // New message from client
      const messageData = data.value as unknown as { content: string; senderId: string }
      // If message is from current chat user, add to current chat
      if (messageData.senderId === userInfo.value.id) {
        currentChat.value.push({
          content: messageData.content,
          createdBy: 'Người dùng',
          time: new Date().getTime()
        })
      }
      // Update chat list to show latest message
      fetchUserChatList()
    }
    isLoading.value = false
  })
})
onUnmounted(() => {
  if (removeListener) removeListener()
})
const topFavorites = computed(() => {
  return listUserChat.value.map((item) => ({
    id: item.userId,
    avatar: item.urlImage || '/images/avatar-user-default.png',
    online: item.online
  }))
})

const sendMessage = () => {
  if (newMessage.value.trim()) {
    isScrollToTop.value = false
    pageIndex.value = 1
    const socket = getSocket()
    currentChat.value.push({
      content: newMessage.value,
      time: new Date().getTime(),
      createdBy: 'Hệ thống'
    })
    socket.send({
      requestType: 'Admin-Chat',
      data: {
        toUserId: userInfo.value.id,
        content: newMessage.value
      }
    })
    fetchUserChatList()
    newMessage.value = ''
  }
}

const fetchUserChatList = (name = '') => {
  const socket = getSocket()
  isScrollToTop.value = false
  searchQuery.value = name
  socket.send({
    requestType: 'Get-All-Chat',
    data: { name }
  })
}

fetchUserChatList()

const loadMoreMessage = () => {
  socket.send({
    requestType: 'Get-Chat-History',
    data: {
      userId: userInfo.value.id,
      pageIndex: pageIndex.value + 1,
      pageSize: 20
    }
  })
  pageIndex.value++
}
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  height: 100%;
  margin: 0 auto;
  border-radius: 8px;
}
</style>
