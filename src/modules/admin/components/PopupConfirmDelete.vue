<template>
  <BasePopup name="popup-confirm-delete" width="480">
    <template #title> Confirm delete </template>
    <div>
      <p class="text-base">Bạn có chắc chắn muốn xóa {{ props.type }} {{ props.name }} không?</p>
    </div>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20">Hủy</BaseButton>
        <BaseButton :loading="props.isLoadingButton" size="small" class="w-20" @click="emits('delete')">Xóa</BaseButton>
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
interface IProps {
  name?: string
  type: string
  isLoadingButton: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  name: '',
  type: '',
  isLoadingButton: false
})
const emits = defineEmits<{
  cancel: []
  delete: []
}>()
</script>

<style scoped></style>
