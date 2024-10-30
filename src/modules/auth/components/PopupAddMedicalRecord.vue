<template>
  <BasePopup name="popup-add-medical-record" width="980">
    <template #title> Thêm hồ sơ bệnh án </template>
    <div class="space-y-3">
      <div class="style-flex">
        <div class="mr-[86px] space-y-2">
          <span class="text-label">Họ và tên </span>
          <ElInput
            v-model="medicalRecord.name"
            class="input"
            style="height: 50px; width: 400px"
            placeholder="VÍ DỤ: NGỌ ĐỨC CẢNH"
          />
        </div>
        <div class="space-y-2">
          <span class="text-label"> Ngày khám </span>
          <ElDatePicker
            v-model="medicalRecord.dateOfVisit"
            type="date"
            placeholder="DD/MM/YYYY"
            class="date-picker"
            format="DD/MM/YYYY"
          />
        </div>
      </div>
      <div class="style-flex">
        <div class="space-y-2">
          <p class="text-label">Chuẩn đoán</p>
          <ElInput v-model="medicalRecord.diagnosis" class="input" style="height: 50px; width: 400px" />
        </div>
        <div class="space-y-2">
          <p class="text-label">Điều trị</p>
          <ElInput v-model="medicalRecord.treatment" class="input" style="height: 50px; width: 400px" />
        </div>
      </div>

      <div class="style-flex">
        <div class="space-y-2">
          <p class="text-label">Ghi chú của bác sĩ</p>
          <ElInput
            v-model="medicalRecord.doctorNotes"
            class="input"
            style="height: 50px; width: 400px"
            :autosize="{ minRows: 2 }"
            type="textarea"
          />
        </div>
        <div class="space-y-2">
          <p class="text-label">Đơn thuốc</p>
          <ElInput
            v-model="medicalRecord.prescribedMedication"
            class="input"
            style="height: 50px; width: 400px"
            :autosize="{ minRows: 2 }"
            type="textarea"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20">Hủy</BaseButton>
        <BaseButton :loading="props.isLoadingButton" size="small" class="w-20" @click="handleAdd">Thêm</BaseButton>
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import type { MedicalRecordReq } from '@/types/user.types'

const route = useRoute()

interface IProps {
  isLoadingButton: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  isLoadingButton: false
})
const emits = defineEmits<{
  cancel: []
  add: [medicalRecord: MedicalRecordReq]
}>()

const medicalRecord = ref<MedicalRecordReq>({
  patientId: route.params.id as string,
  name: '',
  dateOfVisit: '',
  diagnosis: '',
  treatment: '',
  doctorNotes: '',
  prescribedMedication: ''
})
const handleAdd = () => {
  emits('add', { ...medicalRecord.value })
  medicalRecord.value = {
    patientId: route.params.id as string,
    name: '',
    dateOfVisit: '',
    diagnosis: '',
    treatment: '',
    doctorNotes: '',
    prescribedMedication: ''
  }
}
</script>

<style scoped lang="scss">
.style-flex {
  @apply flex items-start justify-between;
}
.text-label {
  @apply text-xl font-medium text-[#003553];
}
:deep(.date-picker.el-input) {
  height: 50px;
  width: 400px;
  .el-input__wrapper {
    border-radius: 8px;
  }
}
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
