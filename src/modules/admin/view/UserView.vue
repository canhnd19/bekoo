<template>
  <div>
    <div class="flex items-start justify-between">
      <BaseInput v-model="search" class="input-search" :show-icon="true" />
      <BaseButton size="small" class="w-20">Add</BaseButton>
    </div>
    <BaseTable
      v-model:page="query.pageIndex"
      v-model:limit="query.pageSize"
      :data="data"
      :query="query"
      class="mt-6"
      label="transaction"
      @page-change="getAllUsers"
      @limit-change="getAllUsers"
    >
      <ElTableColumn type="index" :index="(index) => printIndex(index, query)" label="#" align="center" />
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiUser } from '@/services'

import type { IQuery } from '@/types/query.type'

const search = ref<string>('')

const query = ref<IQuery>({
  ...DEFAULT_QUERY_PAGINATION
})

onMounted(() => {
  getAllUsers()
})
const getAllUsers = async () => {
  try {
    query.value.loading = true
    const rs = await apiUser.getAllUser(query.value)
    console.log('🚀 ~ getAllUsers ~ rs:', rs)
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
