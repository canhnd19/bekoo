<template>
  <Swiper
    ref="{swiperRef}"
    :slides-per-view="4"
    :space-between="30"
    :pagination="{
      type: 'fraction'
    }"
    :navigation="true"
    :modules="modules"
    class="my-swiper"
  >
    <template v-if="props.isLoading">
      <BaseLoading />
    </template>
    <template v-else>
      <SwiperSlide v-for="(item, index) in props.dataSummary" :key="index">
        <div class="rounded-lg border border-solid border-[#DBDBDB] px-4 py-6">
          <div class="mb-2 flex items-center justify-between">
            <span class="text-[#5B616E]">{{ item.title }}</span>
            <base-icon :name="item.icon" size="24" :style="{ color: item.color }" />
          </div>
          <span class="text-2xl font-semibold text-[var(--dr-text-input-label-mobile)]">
            <span>{{ item.value }}</span>
          </span>
        </div>
      </SwiperSlide>
    </template>
  </Swiper>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import type { ISummary } from '@/types/user.types'

const modules = [Pagination, Navigation]

interface IProp {
  dataSummary: ISummary[]
  isLoading: boolean
}
const props = withDefaults(defineProps<IProp>(), {
  dataSummary: () => [],
  isLoading: false
})
</script>

<style lang="scss">
.my-swiper.swiper {
  padding: 0 24px;
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
