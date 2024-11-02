<template>
  <BasePopup name="popup-edit-doctor" width="600">
    <template #title> Sửa số lượng giới hạn bệnh nhân trong ngày </template>
    <div>
      <p class="text-label mb-2">Số lượng người khám tối đa trong một ngày</p>
      <ElInput
        v-model="maxPaitentADay"
        class="input"
        style="height: 50px"
        placeholder="Vui lòng nhập số lượng bệnh nhân tối đa một ngày"
      />
    </div>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20" @click="handleCancel">Hủy</BaseButton>
        <BaseButton :loading="props.isLoadingButton" size="small" class="w-20" @click="handleEdit">Sửa</BaseButton>
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
  edit: [value: string]
}>()
const maxPaitentADay = ref<string>('')
const handleCancel = () => {
  emits('cancel')
}

const handleEdit = () => {
  emits('edit', maxPaitentADay.value)
  !props.isLoadingButton ? (maxPaitentADay.value = '') : null
}
</script>

<style scoped></style>
