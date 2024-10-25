<template>
  <BasePopup name="popup-confirm-booking" width="480">
    <template #title> Xác nhận thông tin đặt lịch </template>
    <div class="space-y-3">
      <p class="text-xl">
        <span> Chuyên khoa: </span>
        <strong> {{ props.nameDepartment }}</strong>
      </p>
      <p class="text-xl">
        <span> Gói khám: </span>
        <strong> {{ props.bookingInfo.packageName }}</strong>
      </p>
      <p class="text-xl">
        <span> Bác sĩ: </span>
        <strong> {{ props.bookingInfo.doctorName }}</strong>
      </p>
      <p class="text-xl">
        <span> Thời gian: </span>
        <strong> {{ props.data.checkIn }}</strong>
      </p>
      <p class="text-xl">
        <span> Tiền khám: </span>
        <strong> {{ formatCurrency(props.bookingInfo.price) }}</strong>
      </p>
    </div>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20" @click="emits('cancel')">Hủy</BaseButton>
        <BaseButton :loading="props.isLoadingBooking" size="small" class="w-24" @click="emits('booking')"
          >Đặt lịch</BaseButton
        >
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import type { IBookingRequest } from '@/types/booking.types'

const emits = defineEmits<{
  cancel: []
  booking: []
}>()

interface IProps {
  data: IBookingRequest
  bookingInfo: Record<string, any>
  nameDepartment: string
  isLoadingBooking: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  data: () => ({}) as IBookingRequest,
  bookingInfo: () => ({}),
  nameDepartment: '',
  isLoadingBooking: false
})

const formatCurrency = (number: string | number) =>
  Number(number).toLocaleString('vi', {
    style: 'currency',
    currency: 'vnd',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  })
</script>

<style scoped></style>
