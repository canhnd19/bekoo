<template>
  <BasePopup name="popup-confirm-delete" width="480">
    <template #title> Confirm delete user </template>
    <div>
      <p v-if="props.email" class="text-base">Bạn có chắc chắn muốn xóa người dùng {{ props.email }} không?</p>
      <p v-else class="text-base">Bạn có chắc chắn muốn xóa chuyên khoa {{ props.name }} không?</p>
    </div>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20">Hủy</BaseButton>
        <BaseButton :loading="props.isLoadingDelete" size="small" class="w-20" @click="emits('delete')">Xóa</BaseButton>
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
interface IProps {
  email?: string
  name?: string
  isLoadingDelete: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  email: '',
  name: '',
  isLoadingDelete: false
})
const emits = defineEmits<{
  cancel: []
  delete: []
}>()
</script>

<style scoped></style>
