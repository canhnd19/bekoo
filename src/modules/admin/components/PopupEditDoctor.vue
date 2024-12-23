<template>
  <BasePopup name="popup-edit-doctor" width="600">
    <template #title> Sửa số lượng giới hạn bệnh nhân trong ngày </template>
    <div class="mb-4">
      <p class="text-label mb-2">Học vấn</p>
      <BaseSelect v-model="doctorInfo.trainingBy" placeholder="" class="select" :clearable="false">
        <ElOption v-for="(item, index) in EDUCATION" :key="index" :label="item.label" :value="item.value" />
      </BaseSelect>
    </div>
    <div>
      <p class="text-label mb-2">Số lượng người khám tối đa trong một ngày</p>
      <ElInput
        v-model="doctorInfo.maxPaitentADay"
        class="input"
        style="height: 40px"
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
import type { IDoctor } from '@/types/doctor.types'

import { EDUCATION } from '@/constants/index'

interface IProps {
  isLoadingButton: boolean
  doctor: IDoctor
}
const props = withDefaults(defineProps<IProps>(), {
  isLoadingButton: false,
  doctor: () => ({}) as IDoctor
})
const emits = defineEmits<{
  cancel: []
  edit: [{ maxPaitentADay: number; trainingBy: string }]
}>()

const doctorInfo = ref<{ maxPaitentADay: number; trainingBy: string }>({
  maxPaitentADay: props.doctor.maximumPeoplePerDay,
  trainingBy: props.doctor.trainingBy
})

watch(
  () => props.doctor,
  (newData) => {
    doctorInfo.value = {
      maxPaitentADay: newData.maximumPeoplePerDay ?? '',
      trainingBy: newData.trainingBy ?? ''
    }
  }
)

const handleCancel = () => {
  emits('cancel')
}

const handleEdit = () => {
  emits('edit', doctorInfo.value)
  if (!props.isLoadingButton) doctorInfo.value = { maxPaitentADay: 0, trainingBy: '' }
}
</script>

<style scoped lang="scss">
.text-label {
  @apply items-center text-base font-medium;
}
.select {
  :deep(.el-select) {
    .el-select__wrapper {
      height: 40px;
      border-radius: 8px;
      .el-select__placeholder {
        font-size: 16px;
      }
    }
  }
}
:deep(.input.el-input) {
  .el-input__wrapper {
    border-radius: 8px;
    .el-input__inner {
      font-size: 16px;
    }
  }
  .el-textarea__inner {
    font-size: 16px;
    border-radius: 8px;
  }
}
</style>
