<template>
  <BaseTable
    v-model:page="query.pageIndex"
    v-model:limit="query.pageSize"
    :data="data"
    :query="query"
    class="mt-6"
    label="user"
    @page-change="handlePageChange"
    @limit-change="handleLimitChange"
  >
    <ElTableColumn type="index" :index="(index: number) => printIndex(index, query)" label="#" align="center" />
    <ElTableColumn label="tên bệnh nhân">
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
    <ElTableColumn label="thời gian khám">
      <template #default="{ row }">
        <p>{{ useDateFormat(row.checkIn, 'DD/MM/YYYY HH:mm:ss') }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="thời gian khám">
      <template #default="{ row }">
        <p>{{ row.status }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn align="right">
      <template #default="{ row }">
        <div class="mr-3 flex items-center justify-end">
          <BaseIcon name="eye" @click="viewPatientDetail(row)" />
        </div>
      </template>
    </ElTableColumn>
  </BaseTable>
  <PopupPatientDetail :data="dataRow" />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiBooking } from '@/services'

import type { IResBooking } from '@/types/booking.types'
import type { IQuery } from '@/types/query.type'

import useDateFormat from '@/composables/useDateFormat'
import useFormatCurrency from '@/composables/useFormatCurrency'

import { useBaseStore } from '@/stores/base'

import PopupPatientDetail from './PopupPatientDetail.vue'

const { setOpenPopup } = useBaseStore()

interface IProps {
  doctorId: string
}

onMounted(() => {
  getMedicalScheduleDay()
})
const query = ref<IQuery>({
  ...DEFAULT_QUERY_PAGINATION
})
const data = ref<IResBooking[]>([])
const dataRow = ref<IResBooking>({} as IResBooking)
const props = withDefaults(defineProps<IProps>(), {
  doctorId: ''
})

const getMedicalScheduleDay = async () => {
  try {
    query.value.loading = true
    const doctorId = props.doctorId
    const rs = await apiBooking.getMedicalScheduleDay(query.value, doctorId)
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
  getMedicalScheduleDay()
}

const handlePageChange = (page: unknown) => {
  query.value.pageIndex = page as number
  getMedicalScheduleDay()
}

const viewPatientDetail = (data: IResBooking) => {
  dataRow.value = data
  setOpenPopup('popup-patient-detail')
}
</script>

<style scoped></style>
