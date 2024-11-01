<template>
  <!-- <BaseTable
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
    <ElTableColumn label="NAME">
      <template #default="{ row }">
        <p>{{ row.name }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="price">
      <template #default="{ row }">
        <p>{{ row.price }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="ACTION">
      <template #default="{ row }">
        <div class="flex items-center space-x-3">
          <BaseIcon name="delete" @click="handleDelete(row)" />
        </div>
      </template>
    </ElTableColumn>
  </BaseTable> -->
  <div>sdfbsdf</div>
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiBooking } from '@/services'

import type { IQuery } from '@/types/query.type'

interface IProps {
  doctorId: string
}

onMounted(() => {
  getMedicalScheduleDay()
})
const query = ref<IQuery>({
  ...DEFAULT_QUERY_PAGINATION
})
const props = withDefaults(defineProps<IProps>(), {
  doctorId: ''
})

const getMedicalScheduleDay = async () => {
  try {
    query.value.loading = true
    const doctorId = props.doctorId
    const rs = await apiBooking.getMedicalScheduleDay(query.value, doctorId)
    console.log('🚀 ~ getMedicalScheduleDay ~ rs:', rs)
    // data.value = rs.value.contentResponse
    query.value.totalElements = rs.value.totalElements
    query.value.loading = false
  } catch (error) {
    query.value.loading = false
    console.log(error)
  }
}

// const rs = await apiBooking.getMedicalAllDay(query.value, doctorId)
</script>

<style scoped></style>
