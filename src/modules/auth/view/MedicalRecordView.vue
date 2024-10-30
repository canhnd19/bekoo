<template>
  <div class="bg-[#e8f2f7]">
    <div class="container pb-10 pt-2">
      <div class="mb-10">
        <p class="my-5 flex items-center justify-start space-x-2">
          <span class="cursor-pointer text-base font-semibold" @click="handleClickHome">Trang chủ</span>
          <BaseIcon name="arrow-right" />
          <span class="cursor-pointer font-semibold text-primary">Hồ sơ bệnh án</span>
        </p>
      </div>
      <p class="text-center text-4xl font-semibold text-primary">Hồ sơ bệnh nhân</p>

      <template v-if="isLoading">
        <BaseLoading />
      </template>
      <template v-else-if="!medicalRecord.length">
        <BaseEmpty />
      </template>
      <template v-else>
        <div v-for="(item, index) in medicalRecord" :key="index" class="mx-auto my-4 w-[600px]">
          <div
            class="cursor-pointer space-y-2 rounded-lg border border-solid bg-white p-6 hover:border-[#00b5f1]"
            @click="isActive = item.id"
          >
            <p>
              <span>Họ và tên: </span>
              <strong>{{ item.name }}</strong>
            </p>
            <p>
              <span>Ngày khám: </span>
              <strong>{{ item.dateOfVisit }}</strong>
            </p>
            <p>
              <span>Chuẩn đoán: </span>
              <strong>{{ item.diagnosis }}</strong>
            </p>
            <p>
              <span>Ghi chú của bác sĩ: </span>
              <strong>{{ item.doctorNotes }}</strong>
            </p>
            <p>
              <span>Đơn thuốc: </span>
              <strong>{{ item.prescribedMedication }}</strong>
            </p>
            <p v-if="isActive === item.id" class="btn-delete" @click="handleDelete(item)">
              <BaseIcon name="delete" />
              <span>Xóa</span>
            </p>
          </div>
        </div>
      </template>
      <div class="add">
        <div class="rounded-full bg-white p-1">
          <BaseIcon name="add-user" size="14" class="text-primary" />
        </div>
        <span class="text-sm text-white" @click="setOpenPopup('popup-add-medical-record')">Thêm hồ sơ</span>
      </div>
    </div>
  </div>
  <PopupAddMedicalRecord
    :is-loading-button="isLoadingButton"
    @cancel="setOpenPopup('popup-add-medical-record', false)"
    @add="handleAddMedicalRecord"
  />
</template>

<script setup lang="ts">
import router from '@/router'
import { apiPatient } from '@/services'

import type { MedicalRecordReq, MedicalRecordRes } from '@/types/user.types'

import { useConvertUTCTime } from '@/composables/useConvertUTCTime'

import { useAuthStore } from '@/stores/auth'
import { useBaseStore } from '@/stores/base'

import PopupAddMedicalRecord from '../components/PopupAddMedicalRecord.vue'

const { setOpenPopup } = useBaseStore()

onMounted(() => {
  getMedicalRecoed()
})

const { patient } = useAuthStore()
const isLoading = ref<boolean>(false)
const isLoadingButton = ref<boolean>(false)
const isLoadingDetele = ref<boolean>(false)
const medicalRecord = ref<MedicalRecordRes[]>([])
const isActive = ref<string>('')
const getMedicalRecoed = async () => {
  try {
    isLoading.value = true
    const rs = await apiPatient.getMedicalRecord(patient.id)
    medicalRecord.value = rs.value.contentResponse
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}

const handleClickHome = () => {
  router.push({ name: 'Home' })
}
const handleAddMedicalRecord = async (data: MedicalRecordReq) => {
  try {
    isLoadingButton.value = true
    const body = {
      ...data,
      dateOfVisit: useConvertUTCTime(data.dateOfVisit, 'FROM')
    }
    const rs = await apiPatient.addMedicalRecord(body)
    ElMessage.success(rs.message)
    setOpenPopup('popup-add-medical-record', false)
    isLoadingButton.value = false
    getMedicalRecoed()
  } catch (error) {
    isLoadingButton.value = false
    console.log(error)
  }
}

const handleDelete = async (data: MedicalRecordRes) => {
  try {
    isLoadingDetele.value = true
    const rs = await apiPatient.deleteMedicalRecord(data.id)
    ElMessage.success(rs.message)
    isLoadingDetele.value = false
    getMedicalRecoed()
  } catch (error) {
    console.log(error)
    isLoadingDetele.value = false
  }
}
</script>

<style scoped lang="scss">
.add {
  padding: 8px 10px !important;
  border: none;
  background: linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%) !important;
  border-radius: 8px;
  @apply mx-auto flex w-32 cursor-pointer items-center justify-center space-x-2;
}
.btn-delete {
  background-color: rgba(253, 57, 122, 0.1);
  @apply mx-auto flex w-24 items-center justify-center space-x-1 rounded-lg py-1 text-[#ff2e2e];
}
</style>
