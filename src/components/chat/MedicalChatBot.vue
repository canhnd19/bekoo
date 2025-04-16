<template>
  <div class="fixed bottom-8 right-8 h-[46px] cursor-pointer sm:bottom-16 sm:right-2">
    <BaseIcon ref="buttonRef" v-click-outside="onClickOutside" name="chat-bot" size="40" class="text-primary" />
    <ElPopover
      ref="popoverRef"
      :popper-style="{ padding: 0, borderRadius: '8px' }"
      placement="left"
      :virtual-ref="buttonRef"
      trigger="click"
      virtual-triggering
      width="400px"
    >
      <div class="chat-container">
        <!-- Chat Header -->
        <div class="chat-header">
          <div class="user-info">
            <div class="avatar rounded-full bg-white p-1">
              <img src="/favicon.png" alt="User avatar" />
            </div>
            <div class="user-details">
              <div class="user-name">Chăm sóc khách hàng Bekoo</div>
              <div class="user-status">Tư Vấn Trực Tuyến</div>
            </div>
          </div>
        </div>

        <!-- Chat Messages -->
        <div ref="messagesContainer" class="chat-messages">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message-wrapper', message.sender === 'user' ? 'user-message' : 'bot-message']"
          >
            <div v-if="message.sender === 'bot'" class="bot-avatar">
              <img src="/favicon.png" alt="User avatar" class="rounded-full bg-white p-1" />
            </div>
            <div class="message">
              {{ message.text }}
            </div>
          </div>

          <div v-if="userTyping" class="user-typing">{{ userName }} đã tham gia hội thoại</div>

          <div v-if="showActionButton" class="action-button-container">
            <button class="action-button" @click="scheduleAppointment">Đặt lịch khám mới</button>
          </div>
        </div>

        <!-- Chat Input -->
        <div class="chat-input space-x-4">
          <input v-model="newMessage" type="text" placeholder="Nhập nội dung..." @keyup.enter="sendMessage" />
          <button class="btn-primary" @click="sendMessage">
            <BaseIcon name="send" size="20" />
          </button>
        </div>
      </div>
    </ElPopover>
  </div>
</template>

<script setup lang="ts">
import { ClickOutside as vClickOutside } from 'element-plus'
import { nextTick, onMounted, ref, watch } from 'vue'

// Types
interface Message {
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
// Props with default values
const userName = ref('Nguyễn Hậu')

// Reactive state
const messages = ref<Message[]>([])
const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const userTyping = ref(false)
const showActionButton = ref(false)

// Initial messages
onMounted(() => {
  // Add initial bot message after a short delay
  setTimeout(() => {
    addMessage('Bạn cần đăng ký khám tại bệnh viện nào ạ?', 'bot')
    showActionButton.value = true
  }, 1000)
})

// Methods
const addMessage = (text: string, sender: 'user' | 'bot') => {
  messages.value.push({
    text,
    sender,
    timestamp: new Date()
  })

  // Scroll to bottom after message is added
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const sendMessage = () => {
  if (newMessage.value.trim() === '') return

  // Add user message
  addMessage(newMessage.value, 'user')

  // Clear input
  const userInput = newMessage.value
  newMessage.value = ''

  // Show typing indicator
  userTyping.value = true

  // Simulate bot response after a delay
  setTimeout(() => {
    userTyping.value = false

    // Bot response based on user input
    if (userInput.toLowerCase().includes('khám')) {
      addMessage(
        'Medpro đã tiếp nhận thông tin và đang kết nối với nhân viên hỗ trợ, bạn vui lòng chờ trong giây lát.',
        'bot'
      )
    } else if (userInput.toLowerCase().includes('cảm ơn')) {
      addMessage('Cảm ơn anh/chị quan tâm đến dịch vụ Medpro.', 'bot')
    } else {
      addMessage('Em có thể hỗ trợ thông tin gì cho anh/chị ạ?', 'bot')
    }
  }, 1500)
}

const scheduleAppointment = () => {
  addMessage('Tôi muốn đặt lịch khám', 'user')

  // Simulate bot response
  setTimeout(() => {
    addMessage(
      'Medpro đã tiếp nhận thông tin và đang kết nối với nhân viên hỗ trợ, bạn vui lòng chờ trong giây lát.',
      'bot'
    )
  }, 1000)
}

// Watch for new messages to scroll to bottom
watch(messages, () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
})
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--primary);
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-weight: 600;
  font-size: 16px;
}

.user-status {
  font-size: 12px;
  opacity: 0.9;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
}

.btn-icon:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  /* background-color: #f5f5f5; */
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-wrapper {
  display: flex;
  margin-bottom: 8px;
  width: 100%;
}

.bot-message {
  align-self: flex-start;
}

.user-message {
  align-self: flex-end;
  justify-content: flex-end;
}

.bot-avatar {
  margin-right: 8px;
}

.bot-avatar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.message {
  padding: 10px 14px;
  border-radius: 18px;
  max-width: 70%;
  word-break: break-word;
}

.bot-message .message {
  background-color: #f0f0f0;
  border-top-left-radius: 4px;
}

.user-message .message {
  background-color: var(--primary);
  color: white;
  border-top-right-radius: 4px;
}

.user-typing {
  font-size: 12px;
  color: #666;
  font-style: italic;
  text-align: center;
  margin: 8px 0;
}

.action-button-container {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}

.action-button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.action-button:hover {
  background-color: var(--primary);
}

.chat-input {
  display: flex;
  padding: 12px;
  background-color: white;
  border-top: 1px solid #eee;
}

.chat-input input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--primary);
}
</style>
