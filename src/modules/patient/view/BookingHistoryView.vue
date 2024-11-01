<template>
  <div class="bg-[#e8f2f7] py-10">
    <div class="container">
      <BaseTable
        v-model:page="query.pageIndex"
        v-model:limit="query.pageSize"
        :data="data"
        :query="query"
        class="mt-6"
        @page-change="handlePageChange"
        @limit-change="handleLimitChange"
      >
        <ElTableColumn type="index" :index="(index: number) => printIndex(index, query)" label="#" align="center" />
        <ElTableColumn label="thời gian">
          <template #default="{ row }">
            <p>{{ row.checkIn }}</p>
          </template>
        </ElTableColumn>
        <ElTableColumn label="bác sĩ">
          <template #default="{ row }">
            <p>{{ row.doctor.info.name }}</p>
          </template>
        </ElTableColumn>
        <ElTableColumn label="chuyên khoa">
          <template #default="{ row }">
            <p>{{ row.specialize.department.name }}</p>
          </template>
        </ElTableColumn>
        <ElTableColumn label="gói khám">
          <template #default="{ row }">
            <p>{{ row.specialize.name }}</p>
          </template>
        </ElTableColumn>
        <ElTableColumn label="giá" align="right">
          <template #default="{ row }">
            <p>{{ row.specialize.price }}</p>
          </template>
        </ElTableColumn>
      </BaseTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiBooking } from '@/services'

import type { IQuery } from '@/types/query.type'
import type { IHistoryBoking } from '@/types/user.types'

const route = useRoute()
onMounted(() => {
  getDataBookingHistory()
})
const data = ref<IHistoryBoking[]>([])
const statusId = ref<number>(1)
const query = ref<IQuery>({
  ...DEFAULT_QUERY_PAGINATION
})
const getDataBookingHistory = async () => {
  try {
    query.value.loading = true
    const patientId = route.params.id as string
    const rs = await apiBooking.getDataBookingHistory(patientId, statusId.value, query.value)
    data.value = rs.value.contentResponse
    console.log('🚀 ~ getDataBookingHistory ~  data.value:', data.value)
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
  getDataBookingHistory()
}

const handlePageChange = (page: unknown) => {
  query.value.pageIndex = page as number
  getDataBookingHistory()
}
</script>

<style scoped></style>
