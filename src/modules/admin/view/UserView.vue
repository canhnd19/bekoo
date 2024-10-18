<template>
  <div class="rounded-lg p-4">
    <div class="flex items-start justify-between">
      <BaseInput v-model="query.search" class="input-search" :show-icon="true" />
      <BaseButton size="small" class="w-20">Add</BaseButton>
    </div>
    <BaseTable
      v-model:page="query.pageIndex"
      v-model:limit="query.pageSize"
      :data="data"
      :query="query"
      class="mt-6"
      label="user"
      @page-change="getAllUser"
      @limit-change="getAllUser"
    >
      <ElTableColumn type="index" :index="(index: number) => printIndex(index, query)" label="#" align="center" />
      <ElTableColumn label="NAME">
        <template #default="{ row }">
          <p>{{ row.name }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="EMAIL">
        <template #default="{ row }">
          <p>{{ row.email }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="PHONE NUMBER">
        <template #default="{ row }">
          <p>{{ row.phoneNumber }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="GENDER">
        <template #default="{ row }">
          <p>{{ row.gender }}</p>
        </template>
      </ElTableColumn>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiUser } from '@/services'

import type { IQueryUser } from '@/types/admin.types'
import type { IUserTable } from '@/types/user.types'

const query = ref<IQueryUser>({
  ...DEFAULT_QUERY_PAGINATION,
  search: ''
})
const data = ref<IUserTable[]>([])

onMounted(() => {
  getAllUser()
})

const getAllUser = async () => {
  try {
    query.value.loading = true
    const rs = await apiUser.getAllUser(query.value)
    data.value = rs.value.contentResponse
    query.value.totalPage = rs.value.totalPage
    query.value.loading = false
  } catch (error) {
    query.value.loading = false
    console.log(error)
  }
}
</script>

<style scoped lang="scss">
.input-search {
  width: 100%;
  text-align: left;
  :deep(.el-input) {
    width: 300px;
    height: 40px;
  }
}
</style>
