<template>
  <div class="relative">
    <div class="marquee bg-[#ffb340] py-4">
      <div class="marquee-content font-semibold text-white">
        <p>🎇 Tết đã về! Giảm Giá Đến 200.000đ - Vui lòng đặt lịch khám để được ưu đãi này!</p>
        <p>🎉 Khám sức khỏe định kỳ với giá ưu đãi!</p>
        <p>🎁 Ưu đãi đặc biệt cho khách hàng mới!</p>
        <p>🏥 Đặt lịch khám trực tuyến nhanh chóng và tiện lợi!</p>
        <p>🎇 Tết đã về! Giảm Giá Đến 200.000đ - Vui lòng đặt lịch khám để được ưu đãi này!</p>
        <p>🎉 Khám sức khỏe định kỳ với giá ưu đãi!</p>
        <p>🎁 Ưu đãi đặc biệt cho khách hàng mới!</p>
        <p>🏥 Đặt lịch khám trực tuyến nhanh chóng và tiện lợi!</p>
        <p>🎇 Tết đã về! Giảm Giá Đến 200.000đ - Vui lòng đặt lịch khám để được ưu đãi này!</p>
        <p>🎉 Khám sức khỏe định kỳ với giá ưu đãi!</p>
        <p>🎁 Ưu đãi đặc biệt cho khách hàng mới!</p>
        <p>🏥 Đặt lịch khám trực tuyến nhanh chóng và tiện lợi!</p>
      </div>
    </div>
    <img src="/images/homepage_banner.png" alt="" />
    <template v-if="isDesktop">
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
    </template>
    <div v-else class="grid grid-cols-2 gap-8">
      <template v-for="(item, index) in CAROUSEL_HOMEPAGE" :key="index">
        <div class="carousel-item">
          <img :src="item.icon" alt="" class="mx-auto w-14" />
          <p class="mt-2 text-center">{{ item.label }}</p>
        </div>
      </template>
    </div>
  </div>
  <!-- TODO: Chuyên khoa -->
  <div class="container mt-28">
    <p class="label">CHUYÊN KHOA</p>
    <div class="my-8 grid grid-cols-8 gap-x-12 gap-y-8 sm:grid-cols-2">
      <template v-for="(item, index) in showMore && data.length > 0 ? data : department" :key="index">
        <div class="cursor-pointer" @click="handleClickDepartment(item)">
          <img :src="item.urlImage" alt="" class="mx-auto h-20 w-20" />
          <p class="mt-2 text-center text-[20px]">{{ item.name }}</p>
        </div>
      </template>
    </div>
    <div class="flex items-center justify-center" @click="handleShowMore">
      <div class="show-more">
        <div v-if="query.loading" class="is-loading">
          <BaseIcon name="loading" class="text-black" />
        </div>
        <p v-if="showMore && data.length > 0">Thu gọn</p>
        <p v-else>Xem tất cả</p>
        <BaseIcon :name="showMore && data.length > 0 ? 'direction-up' : 'direction-down'" class="ml-2" />
      </div>
    </div>
  </div>
  <!-- TODO: Feedback -->
  <div class="container mt-28">
    <p class="label">Cảm nhận từ khách hàng</p>
    <Swiper
      ref="{swiperRef}"
      :slides-per-view="isDesktop ? 3 : 1"
      :space-between="40"
      :pagination="{
        type: 'fraction'
      }"
      :navigation="true"
      :modules="modules"
      class="my-swiper my-8"
    >
      <SwiperSlide v-for="(item, index) in FEEDBACK" :key="index">
        <div class="feedback-card">
          <div class="mx-auto">
            <BaseIcon name="icon-feedback" class="ml-2 flex justify-center text-[#ced3d9]" />
          </div>
          <p>{{ item.detailFeelPeople }}</p>
          <div class="border-border-table flex items-center justify-center space-x-2 border-t border-solid pt-4">
            <img :src="item.avatar" alt="" class="h-10 w-10 rounded-full object-cover" />
            <p class="text-base font-semibold">{{ item.name }}</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
  <!-- TODO: Thống kê -->
  <div class="bg"></div>
  <div class="statistics">
    <div class="container">
      <p class="label">THỐNG KÊ</p>
      <div class="statistics-item">
        <template v-for="(item, index) in STATISTICS" :key="index">
          <div class="cursor-pointer">
            <img :src="item.icon" alt="" class="mx-auto w-24" />
            <p class="text-center text-2xl font-bold text-[#24313d]">{{ item.value }}</p>
            <p class="mt-2 text-center text-[20px] text-[#757575]">{{ item.label }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>

  <!-- TODO: -->

  <MedicalChatBot />
</template>

<script setup lang="ts">
import router from '@/router'
import { apiDepartment } from '@/services'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import type { IDepartment } from '@/types/department.types'
import type { IQuery } from '@/types/query.type'

import MedicalChatBot from '@/components/chat/MedicalChatBot.vue'

import { useBaseStore } from '@/stores/base'

import { CAROUSEL_HOMEPAGE, FEEDBACK, STATISTICS } from '../constants/index'

const { isDesktop } = storeToRefs(useBaseStore())

const modules = [Pagination, Navigation]

const data = ref<IDepartment[]>([])
const search = ref<string>('')
const showMore = ref<boolean>(false)

const { department } = useBaseStore()
const query = ref<IQuery>({
  pageIndex: 1,
  pageSize: 10,
  totalElements: 0,
  loading: false
})

const getListDepartment = async () => {
  if (data.value.length > 0) {
    return
  }
  try {
    query.value.loading = true
    const rs = await apiDepartment.getAllDepartment()
    data.value = rs.value.contentResponse
    query.value.loading = false
  } catch (error) {
    query.value.loading = false
    console.log(error)
  }
}
const handleShowMore = () => {
  showMore.value = !showMore.value
  if (showMore.value) {
    getListDepartment()
  }
}
const handleClickDepartment = (data: IDepartment) => {
  sessionStorage.setItem('department-name', data.name)
  router.push({ name: 'DepartmentDetail', params: { id: data.id } })
}
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
  @apply absolute -bottom-16 flex w-full items-center justify-center space-x-6 sm:grid sm:grid-cols-4 sm:gap-8;
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
.label {
  @apply text-center text-[28px] font-bold;
}
.bg {
  background: linear-gradient(180deg, #fff, #ebf2ff);
  height: 68.15px;
}
.statistics {
  background: rgb(232, 244, 253);
  @apply pb-16;
  .statistics-item {
    @apply mt-6 flex items-center justify-around rounded-3xl bg-white p-6 sm:grid sm:grid-cols-2;
  }
}
.is-loading {
  margin-right: 6px;
  animation: rotating 2s linear infinite;
}
.feedback-card {
  @apply flex flex-col justify-between overflow-hidden rounded-2xl bg-[#f0f3f8] p-6;
  transition: box-shadow 0.3s ease-in;
  min-width: 360px;
  max-width: 360px;
  height: 300px;
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.marquee {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
}

.marquee-content {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 80s linear infinite; /* Thay đổi thời gian thành 30 giây */
}

.marquee-content p {
  display: inline-block;
  margin-right: 80px; /* Khoảng cách giữa các dòng chữ */
}

@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
</style>

<style lang="scss">
.my-swiper.swiper {
  text-align: center;
  padding: 0 24px 0 40px;
  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 20px !important;
  }
  .swiper-button-next,
  .swiper-rtl .swiper-button-prev {
    right: var(--swiper-navigation-sides-offset, -8px);
  }
  .swiper-button-prev,
  .swiper-rtl .swiper-button-next {
    left: var(--swiper-navigation-sides-offset, -8px);
  }
  .swiper-pagination {
    display: none;
  }
}
</style>
