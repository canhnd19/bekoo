<template>
  <div class="app-container">
    <ChatSidebar
      :favorites="favorites"
      :top-favorites="topFavorites"
      :search-query="searchQuery"
      @update:search-query="searchQuery = $event"
    />
    <ChatMain v-model:message-send="newMessage" :chat="currentChat" @send="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import { apiChat } from '@/services'

import ChatMain from '../components/ChatMain.vue'
import ChatSidebar from '../components/ChatSidebar.vue'

// Types
interface Message {
  id: string
  sender: 'user' | 'contact'
  text: string
  time: string
  avatar: string
}

interface Chat {
  id: string
  name: string
  avatar: string
  status: string
  messages: Message[]
}

interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  unread: number
  time: string
}

// State
const searchQuery = ref('')
const newMessage = ref('')
const isLoading = ref(false)
const query = ref({
  'search-word': ''
})
const currentChat = ref<Chat>({
  id: '1',
  name: 'Emily Brontë',
  avatar: '/images/avatar-user-default.png',
  status: 'Active now',
  messages: [
    {
      id: '1',
      sender: 'contact',
      text: "Hi, I need help with my project. I'm having trouble with the layout design.",
      time: '10:20 PM',
      avatar: '/images/avatar-user-default.png'
    },
    {
      id: '2',
      sender: 'user',
      text: "Of course! What's the issue?",
      time: '10:20 PM',
      avatar: '/images/avatar-user-default.png'
    },
    {
      id: '3',
      sender: 'contact',
      text: "I'm struggling with the layout design.",
      time: '10:20 PM',
      avatar: '/images/avatar-user-default.png'
    },
    {
      id: '4',
      sender: 'contact',
      text: "The spacing between elements doesn't look right. What should I do?",
      time: '10:20 PM',
      avatar: '/images/avatar-user-default.png'
    },
    {
      id: '5',
      sender: 'user',
      text: 'Try adjusting the margins and padding to create better spacing. Sometimes a little tweak can make a big difference.',
      time: '10:20 PM',
      avatar: '/images/avatar-user-default.png'
    },
    {
      id: '6',
      sender: 'user',
      text: "For aligning text, use your design tool's alignment options.",
      time: '10:20 PM',
      avatar: '/images/avatar-user-default.png'
    },
    {
      id: '7',
      sender: 'user',
      text: 'Center, left, or right alignment can help make your design more cohesive.',
      time: '10:20 PM',
      avatar: '/images/avatar-user-default.png'
    },
    {
      id: '8',
      sender: 'contact',
      text: 'Great, thanks for the advice!',
      time: '10:20 PM',
      avatar: '/images/avatar-user-default.png'
    }
  ]
})

const favorites = ref<Contact[]>([
  {
    id: '1',
    name: 'Jane Austen',
    avatar: '/images/avatar-user-default.png',
    lastMessage: 'hello, panel can you help me with...',
    unread: 0,
    time: '8min'
  },
  {
    id: '2',
    name: 'J.K. Rowling',
    avatar: '/images/avatar-user-default.png',
    lastMessage: 'hello, panel can you help me with...',
    unread: 6,
    time: ''
  },
  {
    id: '3',
    name: 'Emily Brontë',
    avatar: '/images/avatar-user-default.png',
    lastMessage: 'hello, panel can you help me with...',
    unread: 0,
    time: '8min'
  },
  {
    id: '4',
    name: 'George Orwell',
    avatar: '/images/avatar-user-default.png',
    lastMessage: 'hello, panel can you help me with...',
    unread: 4,
    time: ''
  },
  {
    id: '5',
    name: 'Fyodor Dostoevsky',
    avatar: '/images/avatar-user-default.png',
    lastMessage: 'hello, panel can you help me with...',
    unread: 0,
    time: '8min'
  },
  {
    id: '6',
    name: 'Harper Lee',
    avatar: '/images/avatar-user-default.png',
    lastMessage: 'hello, panel can you help me with...',
    unread: 0,
    time: '8min'
  },
  {
    id: '7',
    name: 'Charlotte Brontë',
    avatar: '/images/avatar-user-default.png',
    lastMessage: 'hello, panel can you help me with...',
    unread: 1,
    time: ''
  },
  {
    id: '8',
    name: 'Herman Melville',
    avatar: '/images/avatar-user-default.png',
    lastMessage: 'hello, panel can you help me with...',
    unread: 0,
    time: '8min'
  },
  {
    id: '9',
    name: 'Fyodor Dostoevsky',
    avatar: '/images/avatar-user-default.png',
    lastMessage: 'hello, panel can you help me with...',
    unread: 2,
    time: ''
  }
])

// Top favorites for the avatar row
const topFavorites = ref([
  { id: '1', avatar: '/images/avatar-user-default.png' },
  { id: '2', avatar: '/images/avatar-user-default.png' },
  { id: '3', avatar: '/images/avatar-user-default.png' },
  { id: '4', avatar: '/images/avatar-user-default.png' },
  { id: '5', avatar: '/images/avatar-user-default.png' }
])

// Methods
const sendMessage = () => {
  if (newMessage.value.trim()) {
    currentChat.value.messages.push({
      id: (currentChat.value.messages.length + 1).toString(),
      sender: 'user',
      text: newMessage.value,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: '/images/avatar-user-default.png'
    })
    newMessage.value = ''
  }
}

const getListUserChat = async () => {
  isLoading.value = true
  try {
    const rs = await apiChat.getListUserChat(query.value)
    console.log('🚀 ~ getListUserChat ~ rs:', rs)
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
