<template>
  <div class="relative">
    <img src="/images/homepage_banner.png" alt="" />
    <div class="absolute top-20 w-full">
      <p class="mb-2 text-center text-2xl text-[#11a2f3]">Nền tảng công nghệ</p>
      <p class="text-center text-4xl font-bold">Kết nối người dân với Cơ sở - Dịch vụ Y tế</p>
      <BaseInput v-model="search" placeholder="Tìm kiếm gói khám" class="input-search" :show-icon="true" />
      <p class="mt-5 text-center text-xl">Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa</p>
    </div>
    <div class="absolute -bottom-16 flex w-full items-center justify-center space-x-6">
      <template v-for="(item, index) in CAROUSEL_HOMEPAGE" :key="index">
        <div class="carousel-item">
          <img :src="item.icon" alt="" class="mx-auto w-14" />
          <p class="mt-2 text-center">{{ item.label }}</p>
        </div>
      </template>
    </div>
  </div>
  <div class="mt-28"></div>
</template>

<script setup lang="ts">
import { CAROUSEL_HOMEPAGE } from '../constants/index'

const search = ref<string>('')
</script>

<style scoped lang="scss">
.input-search {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  :deep(.el-input) {
    width: 700px;
  }
}
.carousel-item {
  box-shadow: 4px 8px 30px 0 #b1c4da59;
  @apply h-[150px] w-[150px] cursor-pointer rounded-2xl border border-solid bg-white p-4;
  &:hover {
    @apply border-primary;
  }
}
</style>
