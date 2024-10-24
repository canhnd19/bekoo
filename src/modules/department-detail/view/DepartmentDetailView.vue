<template>
  <div class="container mt-4">
    <div class="mb-10">
      <p class="my-5 flex items-center justify-start space-x-2">
        <span class="cursor-pointer text-base font-semibold" @click="handleClickHome">Trang chủ</span>
        <BaseIcon name="arrow-right" />
        <span class="font-semibold text-primary">Tìm kiếm</span>
      </p>
      <p class="my-2 text-center text-4xl font-bold text-primary">Kết quả tìm kiếm</p>
      <BaseInput v-model="search" class="input-search mb-3" :show-icon="true" />
    </div>
    <div class="tab">
      <div class="tab-item" :class="{ active: tabActive === 'DOCTOR' }">
        <p class="text-center text-xl font-medium text-[#11a2f3]">Bác sĩ</p>
      </div>
      <div class="tab-item" :class="{ active: tabActive === 'DEPARTMENT' }">
        <p class="text-center text-xl font-medium text-[#11a2f3]">Gói khám</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

const route = useRoute()
const nameDepartment = sessionStorage.getItem('department-name')
const search = ref<string>(nameDepartment ? nameDepartment : '')
const tabActive = ref<'DOCTOR' | 'DEPARTMENT'>('DOCTOR')
console.log('🚀 ~ route:', route.params.id)

const handleClickHome = () => {
  router.push({ name: 'Home' })
}
</script>

<style scoped lang="scss">
.input-search {
  width: 100%;
  text-align: center;
  margin-top: 28px;
  :deep(.el-input) {
    width: 660px;
    height: 52px;
  }
}
.tab {
  @apply flex items-center justify-center space-x-3 border-t border-solid border-[#e3e3e3] py-6;
  .active {
    background: linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%);
    p {
      color: #fff;
    }
  }
  .tab-item {
    @apply w-36 cursor-pointer rounded-[50px] border border-solid border-transparent bg-[#ebf9fd] px-4 py-[10px] hover:border hover:border-solid hover:border-[#1da1f2];
  }
}
</style>
