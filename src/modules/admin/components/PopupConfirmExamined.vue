<template>
  <BasePopup name="popup-confirm-examined" width="480">
    <template #title> Xác nhận đã khám </template>
    <div>
      <p class="text-base">Xác nhận khám thành công bệnh nhân {{ props.data.patient.info.name }}</p>
    </div>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20">Hủy</BaseButton>
        <BaseButton :loading="props.isLoadingButton" size="small" class="w-40" @click="emits('success', props.data)"
          >Khám thành công</BaseButton
        >
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import type { IResBooking } from '@/types/booking.types'

interface IProps {
  data: IResBooking
  isLoadingButton: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  data: () => ({}) as IResBooking,
  isLoadingButton: false
})
const emits = defineEmits<{
  cancel: []
  success: [data: IResBooking]
}>()
</script>

<style scoped></style>
