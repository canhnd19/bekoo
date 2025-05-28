<template>
  <div class="sidebar">
    <BaseLoading v-if="isLoading" />
    <template v-else>
      <div class="sidebar-header">
        <BaseInput
          v-model:model-value="name"
          class="input-search mb-4"
          :show-icon="true"
          @change="emit('update:searchQuery', name)"
        />
        <div class="avatar-row">
          <div v-for="favorite in topFavorites" :key="favorite.id" class="avatar">
            <img :src="favorite.avatar" alt="Avatar" />
          </div>
        </div>
      </div>

      <div class="favorites-list">
        <div
          v-for="chat in listUserChat"
          :key="chat.userId"
          class="favorite-item"
          :class="{ active: chat.userId === userIdActive }"
          @click="handleClickUser(chat)"
        >
          <div class="avatar">
            <img :src="chat.avatar || '/images/avatar-user-default.png'" alt="Avatar" />
          </div>
          <div class="favorite-info">
            <div class="favorite-name-row">
              <h4>{{ chat.name }}</h4>
              <span class="time">{{ chat.time }} </span>
            </div>
            <p class="last-message">
              {{ chat.senderId ? `${getLastWord(chat.name)}: ${chat.content}` : `Bạn:  ${chat.content}` }}
            </p>
          </div>
          <!-- <div v-if="favorite.unread > 0" class="unread-badge">
            {{ favorite.unread }}
          </div> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IChat } from '@/types/message.types'

const props = defineProps<{
  listUserChat: IChat[]
  topFavorites: Array<{
    id: string
    avatar: string
  }>
  isLoading: boolean
  searchQuery: string
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'click-user', value: IChat): void
}>()

const name = ref('')
const userIdActive = ref('')

watch(
  () => props.listUserChat,
  (newValue) => {
    if (newValue.length > 0) {
      userIdActive.value = newValue[0].userId
    }
  }
)

const handleClickUser = (chat: IChat) => {
  userIdActive.value = chat.userId
  emit('click-user', chat)
}
const getLastWord = (s: string): string => {
  const words = s.trim().split(/\s+/) // loại bỏ khoảng trắng thừa
  return words.at(-1) || ''
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
.sidebar {
  width: 360px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-right: 24px;
  border-radius: 8px;
  background-color: white;
}

.sidebar-header {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-header h2 {
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
}

.avatar-row {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 5px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.input-search {
  width: 100%;
  text-align: left;
  :deep(.el-input) {
    height: 40px;
  }
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

input[type='text'] {
  width: 100%;
  padding: 8px 8px 8px 35px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
}

.favorites-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.favorites-header h3 {
  font-size: 16px;
  font-weight: 600;
}

.add-new-btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
}

.favorites-list {
  flex: 1;
  overflow-y: auto;
}

.favorite-item {
  display: flex;
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  position: relative;
}

.favorite-item:hover {
  background-color: #f9f9f9;
}

.favorite-item.active {
  background-color: #e6f7ff;
}

.favorite-info {
  flex: 1;
  margin-left: 10px;
  overflow: hidden;
}

.favorite-name-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
}

.favorite-name-row h4 {
  font-size: 14px;
  font-weight: 500;
}

.time {
  font-size: 12px;
  color: #888;
}

.last-message {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unread-badge {
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
