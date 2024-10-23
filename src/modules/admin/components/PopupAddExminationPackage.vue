<template>
  <BasePopup name="popup-add-exmination-package" width="480">
    <template #title> Add exmination package </template>
    <div class="space-y-3">
      <div class="space-y-2">
        <p class="text-label">Tên gói khám</p>
        <ElInput
          v-model="packageExmination.name"
          class="input"
          style="height: 50px; width: 100%"
          placeholder="Gói tầm soát ung thư tai - mũi - họng"
        />
      </div>
      <div class="space-y-2">
        <p class="text-label">Mô tả</p>
        <ElInput
          v-model="packageExmination.description"
          class="input"
          style="height: 50px; width: 100%"
          :autosize="{ minRows: 2 }"
          type="textarea"
          placeholder="Vui lòng nhập mô tả"
        />
      </div>
      <div class="space-y-2">
        <p class="text-label">Giá khám</p>

        <ElInput
          v-model="packageExmination.price"
          style="height: 50px; width: 100%"
          class="input"
          :formatter="(value: string) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
        />
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20" @click="emits('cancel')">Hủy</BaseButton>
        <BaseButton :loading="props.isLoading" size="small" class="w-20" @click="handleAdd">Thêm</BaseButton>
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
interface IProps {
  isLoading: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  isLoading: false
})
const emits = defineEmits<{
  cancel: []
  add: [value: Record<string, any>]
}>()
const packageExmination = ref<Record<string, any>>({
  name: '',
  description: '',
  price: ''
})
const handleAdd = () => {
  emits('add', { ...packageExmination.value })
}
</script>

<style scoped lang="scss">
:deep(.input.el-input) {
  .el-input__wrapper {
    border-radius: 8px;
    .el-input__inner {
      font-size: 16px;
    }
  }
}
:deep(.input.el-textarea) {
  .el-textarea__inner {
    font-size: 16px;
    border-radius: 8px;
  }
}
</style>
