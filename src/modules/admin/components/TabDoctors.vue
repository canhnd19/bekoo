<template>
  <div class="mt-3 flex justify-end">
    <BaseButton size="small" class="w-40" @click="setOpenPopup('popup-add-doctor-to-package')">Thêm bác sĩ</BaseButton>
  </div>
  <PopupAddDoctortoPackage :is-loading-add="isLoading" @add="handleAdd" @cancel="handleCancel" />
</template>

<script setup lang="ts">
import { apiDepartment } from '@/services'

import { useBaseStore } from '@/stores/base'

import PopupAddDoctortoPackage from './PopupAddDoctortoPackage.vue'

const { setOpenPopup } = useBaseStore()
interface IProps {
  departmentId: string
}
const props = withDefaults(defineProps<IProps>(), {
  departmentId: ''
})
const isLoading = ref<boolean>(false)

const handleCancel = () => {
  setOpenPopup('popup-add-doctor-to-package', false)
}
const handleAdd = async (id: string) => {
  try {
    isLoading.value = true
    const body = {
      departmentId: props.departmentId,
      doctorId: id
    }
    const rs = await apiDepartment.addDoctorDepartment(body)
    ElMessage.success(rs.message)
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}
</script>

<style scoped></style>
