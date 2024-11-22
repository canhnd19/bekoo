<template>
  <BasePopup name="popup-confirm-delete-booking" width="480">
    <template #title> Hủy lịch đặt khám </template>
    <div>
      <p class="text-base">Bạn có chắc chắn muốn hủy lịch khám không?</p>
    </div>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20">Hủy</BaseButton>
        <BaseButton :loading="props.isLoadingButton" size="small" class="w-20" @click="emits('yes')">Có</BaseButton>
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
interface IProps {
  isLoadingButton: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  isLoadingButton: false
})
const emits = defineEmits<{
  cancel: []
  yes: []
}>()
</script>

<style scoped></style>
