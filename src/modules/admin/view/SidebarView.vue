<template>
  <ElAside width="80px" class="sidebar">
    <div class="flex h-[72px] w-full items-center justify-center">
      <img src="/favicon.png" alt="" class="w-10" />
    </div>
    <div v-for="(menu, index) in listMenu" :key="index" class="mt-2 w-full space-y-2">
      <div
        class="h-16 w-full cursor-pointer text-center hover:!text-primary"
        @click="router.push({ name: menu.routerName })"
      >
        <BaseIcon :name="menu.icon" class="mx-auto w-full" />
        <span class="text-xs">{{ menu.title }}</span>
      </div>
    </div>
  </ElAside>
</template>

<script setup lang="ts">
const router = useRouter()

const listMenu = [
  {
    title: 'Users',
    icon: 'menu-user',
    routerName: 'Users'
  },

  {
    title: 'Doctors',
    icon: 'menu-user',
    routerName: 'Doctors'
  }
]
</script>

<style scoped lang="scss">
.sidebar {
  border-right: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  background-color: #f6f8fc;
}
</style>
