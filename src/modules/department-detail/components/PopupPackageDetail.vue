<template>
  <BasePopup name="popup-package-detail" width="1200" :is-show-footer="false">
    <template #title> Chi tiết gói khám </template>
    <div>
      <p class="mb-8 text-center text-4xl text-primary">{{ props.packageDetail.name }}</p>
      <div class="flex justify-between">
        <div class="space-y-4">
          <div class="flex items-start justify-start space-x-3">
            <BaseIcon name="hospital" class="text-[#ffb54a]" />
            <div>
              <p class="-mt-1 text-2xl font-medium">Bệnh viện Bekoo</p>
              <p class="text-xl text-[#858585]">Hà nội</p>
            </div>
          </div>
          <div class="flex items-start justify-start space-x-3">
            <BaseIcon name="time" class="text-[#ffb54a]" />
            <div>
              <p class="-mt-1 text-2xl font-medium">Lịch khám: Thứ 2,3,4,5,6,7</p>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <p class="text-4xl font-bold text-[#ffb54a]">Giá: {{ useFormatCurrency(props.packageDetail.price) }}đ</p>
          <div class="button">
            <span>Đặt khám ngay</span>
          </div>
        </div>
      </div>
      <div class="my-10 w-full border border-solid border-[#e5e7eb]"></div>
      <p class="text-xl text-[#858585]">{{ props.packageDetail.description }}</p>
    </div>
  </BasePopup>
</template>

<script setup lang="ts">
import type { IPackage } from '@/types/package.types'

import useFormatCurrency from '@/composables/useFormatCurrency'

interface IProps {
  packageDetail: IPackage
}
const props = withDefaults(defineProps<IProps>(), {
  packageDetail: () => ({}) as IPackage
})
// const emits = defineEmits<{
//   cancel: []
//   delete: []
// }>()
</script>

<style scoped lang="scss">
.button {
  display: flex;
  padding: 12px 30px;
  color: #fff;
  align-items: center;
  border-radius: 30px;
  width: 100%;
  white-space: nowrap;
  background: linear-gradient(46deg, #00b5f1, #00e0ff);
  box-shadow: 4px 8px 30px 0 var(--color-boxShadow);
  border: none;
  width: -moz-fit-content;
  width: fit-content;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &:hover {
    cursor: pointer;
    box-shadow: 4px 8px 30px 0 rgba(177, 196, 218, 0.35);
    background: linear-gradient(46deg, #07aae0, #00c6e1);
  }
}
</style>
