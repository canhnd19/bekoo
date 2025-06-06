<template>
  <div class="chat-main">
    <div class="chat-header">
      <div class="chat-user-info">
        <div class="relative">
          <div class="avatar">
            <img :src="userInfo.linkAvatar || '/images/avatar-user-default.png'" alt="Avatar" class="rounded-full" />
          </div>
          <div
            v-if="userInfo.online === 'online' || formatStatus(userInfo.online) === 'online'"
            class="absolute bottom-1 right-2 h-2.5 w-2.5 rounded-full bg-green-500"
          ></div>
        </div>
        <div>
          <h3>{{ userInfo.name }}</h3>
          <p v-if="userInfo.online === 'online'" class="status">Đang hoạt động</p>
          <p v-else class="text-xs text-[var(--placeholder)]">hoạt động {{ userInfo.online }}</p>
        </div>
      </div>
      <div class="flex items-center justify-between gap-6">
        <div class="flex items-center justify-end gap-6">
          <span>AI auto reply</span>
          <el-switch
            v-model="status"
            active-value="Admin-on"
            inactive-value="Admin-off"
            style="--el-switch-on-color: #129961; --el-switch-off-color: #c1c4ce"
            @change="handleStatus"
          />
        </div>
        <div class="info-icon">
          <BaseIcon name="warning" />
        </div>
      </div>
    </div>
    <div ref="messagesContainer" class="messages-container">
      <div
        v-for="message in chat"
        :key="message.createdAt"
        class="message"
        :class="{
          'user-message': message.createdBy === 'Hệ thống',
          'contact-message': message.createdBy === 'Người dùng'
        }"
      >
        <div class="message-content max-w-[70%]">
          <div
            class="flex items-start space-x-2"
            :class="[message.createdBy === 'Hệ thống' ? 'justify-end' : 'justify-start']"
          >
            <img
              v-if="message.createdBy === 'Người dùng'"
              :src="userInfo.linkAvatar || '/images/avatar-user-default.png'"
              alt="Avatar"
              class="h-10 w-10 rounded-full"
            />
            <div class="message-bubble">
              {{ message.content }}
            </div>
            <img
              v-if="message.createdBy === 'Hệ thống'"
              src="/favicon.png"
              alt="Avatar"
              class="h-10 w-10 rounded-full"
            />
          </div>
          <div
            class="message-time"
            :class="[message.createdBy === 'Hệ thống' ? 'mr-12 text-right' : 'ml-12 text-left']"
          >
            {{ message.createdAt ? message.createdAt : formatRelativeTime(convertTimestampToISO(message.time!)) }}
          </div>
        </div>
      </div>
    </div>

    <div class="message-input-container">
      <div class="message-actions">
        <button class="action-btn">
          <BaseIcon name="voice" />
        </button>
        <button class="action-btn">
          <BaseIcon name="image" />
        </button>
        <button class="action-btn">
          <BaseIcon name="face" />
        </button>
      </div>

      <BaseInput
        v-model="messageSend"
        placeholder="Type message..."
        class="input-message mb-4"
        @keydown.enter.prevent="emit('send')"
      />
      <div class="w-12">
        <div class="send-btn" @click="emit('send')">
          <BaseIcon name="send-message" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMessageHistory } from '@/types/message.types'

import getSocket from '@/utils/socket'

const props = defineProps<{
  chat: IMessageHistory[]
  userInfo: {
    id: string
    name: string
    linkAvatar: string
    online: 'online' | 'offline'
  }
}>()

const emit = defineEmits<{
  send: []
}>()
const messagesContainer = ref<HTMLElement | null>(null)

const messageSend = defineModel('messageSend', {
  default: '',
  type: String
})

const status = ref<'Admin-off' | 'Admin-on'>('Admin-on')

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatStatus = (status: string) => {
  if (status.includes('phút trước')) {
    return status.split(' ')[0] + 'm'
  } else if (status.includes('giờ trước')) {
    return status.split(' ')[0] + 'h'
  } else if (status.includes('Vài giây trước')) {
    return 'Online'
  }
}
onMounted(() => {
  scrollToBottom()
})

watch(
  () => props.chat.length,
  () => {
    scrollToBottom()
  }
)
const socket = getSocket()
const handleStatus = () => {
  socket.send({
    requestType: status.value,
    data: {
      toUserId: props.userInfo.id
    }
  })
}
</script>

<style scoped lang="scss">
* {
  scrollbar-width: auto;
  scrollbar-color: #dbdbdb;
}

*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: #dbdbdb;
  border-radius: 10px;
  border: 3px solid #ffffff;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: white;
  border-radius: 8px;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.chat-user-info {
  display: flex;
  align-items: center;
}

.chat-user-info .avatar {
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.chat-user-info h3 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 3px;
}

.status {
  font-size: 12px;
  color: #4caf50;
}

.info-icon {
  color: #888;
  cursor: pointer;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
}

.message {
  display: flex;
  margin-bottom: 15px;
}

.user-message {
  flex-direction: row-reverse;
}

.user-message .message-content {
  align-items: flex-end;
  margin-right: 10px;
}

.contact-message .message-content {
  margin-left: 10px;
}

.message-bubble {
  padding: 10px 15px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
}

.user-message .message-bubble {
  background-color: #007bff;
  color: white;
  border-top-right-radius: 4px;
}

.contact-message .message-bubble {
  background-color: #e9ecef;
  color: #333;
  border-top-left-radius: 4px;
}

.message-time {
  font-size: 11px;
  color: #888;
  margin-top: 5px;
  // text-align: right;
}

.message-input-container {
  display: flex;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #e0e0e0;
}

.message-actions {
  display: flex;
  margin-right: 10px;
}

.action-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  margin-right: 10px;
}

.message-input-container input {
  flex: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 14px;
}

.send-btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
}

.input-message {
  width: 100%;
  margin-bottom: 0;
  text-align: left;
  :deep(.el-input) {
    height: 40px;
    .el-input__wrapper {
      border-radius: 100px;
      .el-input__inner {
        height: 100%;
      }
    }
  }
}
</style>
