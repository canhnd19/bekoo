<template>
  <BasePopup name="popup-doctor-detail" width="700">
    <template #title> Thông tin chi tiết bác sĩ </template>
    <div class="space-y-3">
      <div v-if="!props.doctorDetail.info.linkAvatar" class="flex justify-center">
        <img
          v-if="props.doctorDetail.info.gender === 'Female'"
          src="/images/avatar-default-doctor-female.png"
          alt=""
          class="h-[140px] w-[140px] rounded-full object-cover"
        />
        <img
          v-else
          src="/images/avatar-default-doctor-male.png"
          alt=""
          class="h-[140px] w-[140px] rounded-full object-cover"
        />
      </div>
      <div v-else class="flex justify-center">
        <img :src="props.doctorDetail.info.linkAvatar" alt="" class="h-[140px] w-[140px] rounded-full object-cover" />
      </div>

      <div class="!my-8 flex justify-center text-2xl text-primary">
        <p>{{ props.doctorDetail.trainingBy }} BS.</p>
        <p class="ml-1 font-semibold">{{ props.doctorDetail.info.name }}</p>
      </div>
      <p class="text-lg">
        <span>Ngày sinh: </span>
        <strong>{{ useDateFormat(props.doctorDetail.info.dob, 'DD/MM/YYYY') }}</strong>
      </p>

      <p class="text-lg">
        <span>Số điện thoại: </span>
        <strong>{{ props.doctorDetail.info.phoneNumber }}</strong>
      </p>
      <p class="text-lg">
        <span>email: </span>
        <strong>{{ props.doctorDetail.info.email }}</strong>
      </p>
      <p class="text-lg">
        <span>Địa chỉ: </span>
        <strong>
          {{ props.doctorDetail.info.province }} - {{ props.doctorDetail.info.district }} -
          {{ props.doctorDetail.info.commune }}
        </strong>
      </p>
      <p class="text-lg">
        <span>Địa chỉ cụ thể: </span>
        <strong>{{ props.doctorDetail.info.aboutAddress }}</strong>
      </p>
      <p class="text-lg">
        <span>Thuộc chuyên khoa: </span>
        <strong>{{ props.doctorDetail.department }}</strong>
      </p>
      <p class="text-lg">
        <span>Số lượng bệnh nhân tối đa trong ngày: </span>
        <strong>{{ props.doctorDetail.maximumPeoplePerDay }}</strong>
      </p>
      <p class="text-lg">
        <span>Số lượng bệnh nhân đã đặt khám: </span>
        <strong>{{ props.doctorDetail.totalPatientsVisited }}</strong>
      </p>
      <p class="text-lg">
        <span>Mô tả: </span>
        <strong>{{ props.doctorDetail.description }}</strong>
      </p>
    </div>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20" @click="setOpenPopup('popup-doctor-detail', false)"
          >Đóng</BaseButton
        >
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import type { IDoctor } from '@/types/doctor.types'

import useDateFormat from '@/composables/useDateFormat'

import { useBaseStore } from '@/stores/base'

const { setOpenPopup } = useBaseStore()

interface IProps {
  doctorDetail: IDoctor
}
const props = withDefaults(defineProps<IProps>(), {
  doctorDetail: () => ({}) as IDoctor
})
</script>

<style scoped></style>
