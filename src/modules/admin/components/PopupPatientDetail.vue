<template>
  <BasePopup name="popup-patient-detail" width="900">
    <template #title> Thông tin bệnh nhân </template>
    <div class="space-y-2 text-lg">
      <p>
        <span>Họ và tên: </span>
        <strong>{{ props.data.patient.info.name }}</strong>
      </p>
      <p>
        <span>Giới tính: </span>
        <strong>{{ props.data.patient.info.gender }}</strong>
      </p>
      <p>
        <span>Ngày sinh: </span>
        <strong>{{ useDateFormat(props.data.patient.info.dob, 'DD/MM/YYYY') }}</strong>
      </p>
      <p>
        <span>Số CCCD: </span>
        <strong>{{ props.data.patient.info.cccd }}</strong>
      </p>
      <p>
        <span>Email: </span>
        <strong>{{ props.data.patient.info.email }}</strong>
      </p>
      <p>
        <span>Số điện thoại: </span>
        <strong>{{ props.data.patient.info.phoneNumber }}</strong>
      </p>
      <p>
        <span>Địa chỉ: </span>
        <strong>
          {{ props.data.patient.info.province }} - {{ props.data.patient.info.district }} -
          {{ props.data.patient.info.commune }}
        </strong>
      </p>
      <p>
        <span>Địa chỉ cụ thể: </span>
        <strong>{{ props.data.patient.info.aboutAddress }}</strong>
      </p>
      <p>
        <span>Nhóm máu: </span>
        <strong>{{ props.data.patient.bloodType }}</strong>
      </p>
      <p>
        <span>Số bảo hiểm y tế: </span>
        <strong>
          {{ props.data.patient.healthInsuranceNumber }}
        </strong>
      </p>
      <p class="text-xl text-[#ff2e2e]">Thông tin người thân bệnh nhân ( trường hợp cần liên hệ khẩn cấp)</p>
      <p>
        <span>Họ và tên: </span>
        <strong> {{ props.data.patient.emergencyContacts[0].name }}</strong>
      </p>
      <p>
        <span>Địa chỉ: </span>
        <strong> {{ props.data.patient.emergencyContacts[0].address }}</strong>
      </p>
      <p>
        <span>Số điện thoại: </span>
        <strong> {{ props.data.patient.emergencyContacts[0].phone }}</strong>
      </p>
      <p>
        <span>Mối quan hệ với bệnh nhân: </span>
        <strong> {{ props.data.patient.emergencyContacts[0].relationship }}</strong>
      </p>

      <p class="cursor-pointer text-blue-600 underline" @click="viewPatientMedicalRecord">
        Xem hồ sơ bệnh án của bệnh nhân
      </p>
    </div>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20" @click="setOpenPopup('popup-patient-detail', false)"
          >Đóng</BaseButton
        >
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import router from '@/router'

import type { IResBooking } from '@/types/booking.types'

import useDateFormat from '@/composables/useDateFormat'

import { useBaseStore } from '@/stores/base'

const { setOpenPopup } = useBaseStore()

interface IProps {
  data: IResBooking
}
const props = withDefaults(defineProps<IProps>(), {
  data: () => ({}) as IResBooking
})

const viewPatientMedicalRecord = () => {
  router.push({ name: 'MedicalRecord', params: { id: props.data.patient.id } })
}
</script>

<style scoped></style>
