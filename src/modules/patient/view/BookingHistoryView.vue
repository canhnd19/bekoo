<template>
  <div class="container">
    <p class="flex items-center justify-start space-x-2 py-6">
      <span class="cursor-pointer text-base font-semibold" @click="handleClickHome">Trang chủ</span>
      <BaseIcon name="arrow-right" />
      <span class="cursor-pointer font-semibold text-primary">Lịch sử khám bệnh</span>
    </p>
  </div>
  <div class="bg-[#e8f2f7]">
    <div class="container py-6">
      <BaseSelect v-model="statusId" placeholder="Chọn giới tính" class="select" @change="handleFilter">
        <ElOption v-for="(item, index) in FILTER" :key="index" :value="item.value" :label="item.label"> </ElOption>
      </BaseSelect>
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
            <p>{{ useDateFormat(row.checkIn, 'DD/MM/YYYY HH:mm:ss') }}</p>
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
            <p>{{ useFormatCurrency(row.specialize.price) }}</p>
          </template>
        </ElTableColumn>
      </BaseTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import router from '@/router'
import { apiBooking } from '@/services'

import type { IQuery } from '@/types/query.type'
import type { IHistoryBoking } from '@/types/user.types'

import useDateFormat from '@/composables/useDateFormat'
import useFormatCurrency from '@/composables/useFormatCurrency'

import { FILTER } from '../constants/index'

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
const handleFilter = (data: number) => {
  statusId.value = data
  getDataBookingHistory()
}
const handleClickHome = () => {
  router.push({ name: 'Home' })
}
</script>

<style scoped lang="scss">
.select {
  :deep(.el-select) {
    width: 500px;
    .el-select__wrapper {
      height: 50px;
      border-radius: 8px;
      .el-select__placeholder {
        font-size: 16px;
      }
    }
  }
}
</style>
