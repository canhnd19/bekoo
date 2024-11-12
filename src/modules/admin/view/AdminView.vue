<template>
  <div class="layout container bg-[#dbdbdb]">
    <ElContainer class="h-screen">
      <SidebarView />
      <ElContainer direction="vertical">
        <ElHeader height="70px" class="header flex items-center justify-between bg-[#f6f8fc]">
          <span class="text-3xl font-semibold">{{ nameHeader }}</span>
        </ElHeader>
        <ElScrollbar :always="true" class="sm:!h-full sm:!overflow-visible">
          <ElMain>
            <RouterView />
          </ElMain>
        </ElScrollbar>
      </ElContainer>
    </ElContainer>
  </div>
</template>

<script setup lang="ts">
import SidebarView from './SidebarView.vue'

const route = useRoute()

const nameHeader = computed(() => {
  switch (route.name) {
    case 'Reports':
      return 'Thống kê'
    case 'Users':
      return 'Người dùng'
    case 'Doctors':
      return 'Bác sĩ'
    case 'Departments':
      return 'Chuyên khoa'
    case 'MedicalSchedule':
      return 'Lịch khám'
    default:
      break
  }
})
</script>

<style scoped lang="scss">
.layout {
  .header {
    border-bottom: 1px solid #dbdbdb;
  }
  :deep(.el-container) {
    .el-main,
    .el-header,
    .el-footer {
      padding: 0 32px;
    }
    .el-scrollbar__view {
      height: 100%;
      .el-main {
        background-color: #f6f8fc;
        padding: 24px;
        height: 100%;
      }
    }
  }
}
</style>
