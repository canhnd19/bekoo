<template>
  <ElAside width="80px" class="sidebar">
    <div class="flex h-[72px] w-full items-center justify-center">
      <img src="/favicon.png" alt="" class="w-10 cursor-pointer" @click="router.push({ name: 'Home' })" />
    </div>
    <div v-for="(menu, index) in listMenu" :key="index" class="mt-2 w-full space-y-2">
      <div
        v-if="menu.role.includes(role)"
        class="h-16 w-full cursor-pointer text-center hover:!text-primary"
        :class="{ active: menu.routerName === route.name }"
        @click="router.push({ name: menu.routerName, params: { id: menu.id } })"
      >
        <BaseIcon :name="menu.icon" class="mx-auto w-full" />
        <span class="text-xs">{{ menu.title }}</span>
      </div>
    </div>
  </ElAside>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const { user, role } = useAuthStore()

const listMenu = [
  {
    title: 'Thống kê',
    icon: 'menu-report',
    routerName: 'Reports',
    role: ['ADMIN']
  },
  {
    title: 'Người dùng',
    icon: 'menu-user',
    routerName: 'Users',
    role: ['ADMIN']
  },
  {
    title: 'Bác sĩ',
    icon: 'total-doctor',
    routerName: 'Doctors',
    role: ['ADMIN']
  },
  {
    title: 'Chuyên khoa',
    icon: 'total-department',
    routerName: 'Departments',
    role: ['ADMIN']
  },
  {
    title: 'Lịch khám',
    icon: 'clock',
    routerName: 'MedicalSchedule',
    id: user.doctor?.id,
    role: ['DOCTOR', 'ADMIN']
  },
  {
    title: 'Tin nhắn',
    icon: 'chat-bot',
    routerName: 'Message',
    role: ['ADMIN']
  }
]
</script>

<style scoped lang="scss">
.sidebar {
  border-right: 1px solid #dbdbdb;
  // border-left: 1px solid #dbdbdb;
  background-color: #f6f8fc;
  .active {
    @apply text-primary;
  }
}
</style>
