<template>
  <div class="relative">
    <img src="/images/homepage_banner.png" alt="" />
    <div class="absolute top-20 w-full">
      <p class="mb-2 text-center text-2xl text-[#11a2f3]">Nền tảng công nghệ</p>
      <p class="text-center text-4xl font-bold">Kết nối người dân với Cơ sở - Dịch vụ Y tế</p>
      <BaseInput v-model="search" placeholder="Tìm kiếm gói khám" class="input-search" :show-icon="true" />
      <p class="mt-5 text-center text-xl">Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa</p>
    </div>
    <div class="carousel">
      <template v-for="(item, index) in CAROUSEL_HOMEPAGE" :key="index">
        <div class="carousel-item">
          <img :src="item.icon" alt="" class="mx-auto w-14" />
          <p class="mt-2 text-center">{{ item.label }}</p>
        </div>
      </template>
    </div>
  </div>
  <!-- Chuyên khoa -->
  <div class="mx-auto my-28 max-w-7xl">
    <p class="text-center text-[28px] font-bold">Chuyên khoa</p>
    <div class="my-8 grid grid-cols-8 gap-x-12 gap-y-8">
      <template v-for="(item, index) in showMore ? SPECIALTY_MORE : SPECIALTY" :key="index">
        <div class="cursor-pointer">
          <img :src="item.icon" alt="" class="mx-auto w-20" />
          <p class="mt-2 text-center text-[20px]">{{ item.label }}</p>
        </div>
      </template>
    </div>
    <div class="flex items-center justify-center" @click="showMore = !showMore">
      <div class="show-more">
        <p v-if="showMore">Thu gọn</p>
        <p v-else>Xem tất cả</p>
        <BaseIcon :name="showMore ? 'direction-up' : 'direction-down'" class="ml-2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CAROUSEL_HOMEPAGE, SPECIALTY, SPECIALTY_MORE } from '../constants/index'

const search = ref<string>('')
const showMore = ref<boolean>(false)
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
.carousel {
  @apply absolute -bottom-16 flex w-full items-center justify-center space-x-6;
  .carousel-item {
    box-shadow: 4px 8px 30px 0 #b1c4da59;
    @apply h-[150px] w-[150px] cursor-pointer rounded-2xl border border-solid bg-white p-4;
    &:hover {
      @apply border-primary;
    }
  }
}
.show-more {
  @apply flex cursor-pointer items-center justify-center rounded-lg border border-solid px-3 py-2 text-[20px] text-primary;
  &:hover {
    @apply border-primary;
  }
}
</style>
