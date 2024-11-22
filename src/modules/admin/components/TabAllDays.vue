<template>
  <BaseTable
    v-model:page="query.pageIndex"
    v-model:limit="query.pageSize"
    :data="data"
    :query="query"
    class="mt-6"
    label="người dùng"
    @page-change="handlePageChange"
    @limit-change="handleLimitChange"
  >
    <ElTableColumn type="index" :index="(index: number) => printIndex(index, query)" label="#" align="center" />
    <ElTableColumn label="tên bệnh nhân" width="200">
      <template #default="{ row }">
        <p>{{ row.patient.info.name }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="gói khám">
      <template #default="{ row }">
        <p>{{ row.specialize.name }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="mô tả">
      <template #default="{ row }">
        <p>{{ row.specialize.description }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="giá khám">
      <template #default="{ row }">
        <p>{{ useFormatCurrency(row.specialize.price) }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="thời gian khám" width="200">
      <template #default="{ row }">
        <p>{{ useDateFormat(row.checkIn, 'DD/MM/YYYY HH:mm:ss') }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="trạng thái">
      <template #default="{ row }">
        <p>{{ row.status }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn align="right" label="hành động">
      <template #default="{ row }">
        <div class="mr-3 flex items-center justify-end space-x-3">
          <BaseIcon name="tick" @click="action(row, 'SUCCESS')" />
          <BaseIcon name="eye" @click="action(row, 'VIEW')" />
        </div>
      </template>
    </ElTableColumn>
  </BaseTable>
  <PopupPatientDetail :data="dataRow" />
  <PopupConfirmExamined :data="dataRow" :is-loading-button="isLoadingButton" @success="handleSuccess" />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiBooking } from '@/services'

import type { IResBooking } from '@/types/booking.types'
import type { IQuery } from '@/types/query.type'

import useDateFormat from '@/composables/useDateFormat'
import useFormatCurrency from '@/composables/useFormatCurrency'

import { useBaseStore } from '@/stores/base'

import PopupConfirmExamined from './PopupConfirmExamined.vue'
import PopupPatientDetail from './PopupPatientDetail.vue'

interface IProps {
  doctorId: string
}
const { setOpenPopup } = useBaseStore()
onMounted(() => {
  getMedicalScheduleAllDay()
})
const data = ref<IResBooking[]>([])
const dataRow = ref<IResBooking>({} as IResBooking)
const query = ref<IQuery>({
  ...DEFAULT_QUERY_PAGINATION
})
const isLoadingButton = ref<boolean>(false)
const props = withDefaults(defineProps<IProps>(), {
  doctorId: ''
})

const getMedicalScheduleAllDay = async () => {
  try {
    query.value.loading = true
    const doctorId = props.doctorId
    const rs = await apiBooking.getMedicalScheduleAllDay(query.value, doctorId)
    data.value = rs.value.contentResponse
    query.value.totalElements = rs.value.totalElements
    query.value.loading = false
  } catch (error) {
    query.value.loading = false
    console.log(error)
  }
}
const handleLimitChange = (limit: unknown) => {
  query.value.pageSize = limit as number
  query.value.pageIndex = 1
  getMedicalScheduleAllDay()
}

const handlePageChange = (page: unknown) => {
  query.value.pageIndex = page as number
  getMedicalScheduleAllDay()
}
const action = (data: IResBooking, type: 'SUCCESS' | 'VIEW') => {
  dataRow.value = data
  type === 'SUCCESS' ? setOpenPopup('popup-confirm-examined') : setOpenPopup('popup-patient-detail')
}

const handleSuccess = async (data: IResBooking) => {
  try {
    isLoadingButton.value = true
    const id = data.patient.id
    await apiBooking.deleteBooking(id)
    ElMessage.success('khám bệnh nhân thành công')
    setOpenPopup('popup-confirm-examined', false)
    isLoadingButton.value = false
    getMedicalScheduleAllDay()
  } catch (error) {
    console.log(error)
    isLoadingButton.value = false
  }
}
</script>

<style scoped></style>
