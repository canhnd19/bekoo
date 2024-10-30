<template>
  <template v-if="isLoading">
    <PageLoading />
  </template>
  <div v-else class="bg-[#e8f2f7]">
    <div class="container">
      <div class="mb-10">
        <p class="my-5 flex items-center justify-start space-x-2">
          <span class="cursor-pointer text-base font-semibold" @click="handleClickHome">Trang chủ</span>
          <BaseIcon name="arrow-right" />
          <span class="cursor-pointer font-semibold text-primary">Hồ sơ bệnh án</span>
        </p>
      </div>
      <p class="text-center text-4xl font-semibold text-primary">Hồ sơ bệnh nhân</p>
      <div class="add">
        <div class="rounded-full bg-white p-1"><BaseIcon name="add-user" size="14" class="text-primary" /></div>
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

import type { MedicalRecordReq } from '@/types/user.types'

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
const getMedicalRecoed = async () => {
  try {
    isLoading.value = true
    const rs = await apiPatient.getMedicalRecord(patient.id)
    console.log('🚀 ~ getMedicalRecoed ~ rs:', rs)
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

// dob: useConvertUTCTime(userSignUp.value.dob, 'FROM')
</script>

<style scoped lang="scss">
.add {
  padding: 8px 10px !important;
  border: none;
  background: linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%) !important;
  border-radius: 8px;
  @apply flex w-32 cursor-pointer items-center justify-center space-x-2;
}
</style>
