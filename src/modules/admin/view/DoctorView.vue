<template>
  <div>
    <div class="flex items-start justify-between">
      <BaseInput v-model="search" class="input-search" :show-icon="true" />
      <BaseButton size="small" class="w-20" @click="setOpenPopup('popup-add-doctor')">Add</BaseButton>
    </div>
    <BaseTable
      v-model:page="query.pageIndex"
      v-model:limit="query.pageSize"
      :data="data"
      :query="query"
      class="mt-6"
      label="user"
      @page-change="getAllDoctor"
      @limit-change="getAllDoctor"
    >
      <ElTableColumn type="index" :index="(index: number) => printIndex(index, query)" label="#" align="center" />
      <ElTableColumn label="NAME">
        <template #default="{ row }">
          <p>{{ row.user.name }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="EMAIL">
        <template #default="{ row }">
          <p>{{ row.user.email }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="PHONE NUMBER" width="200">
        <template #default="{ row }">
          <p>{{ row.user.phoneNumber }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="GENDER" width="90">
        <template #default="{ row }">
          <p>{{ row.user.gender }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="ACTION" width="120" align="right">
        <template #default="{ row }">
          <div class="flex items-center justify-end space-x-3">
            <BaseIcon name="edit" @click="handleEditUser" />
            <BaseIcon name="delete" @click="handleDeleteUser(row)" />
          </div>
        </template>
      </ElTableColumn>
    </BaseTable>
  </div>
  <PopupAddDoctor />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiDoctor } from '@/services'

import type { IQueryUser } from '@/types/admin.types'
import type { IDoctor } from '@/types/doctor.types'

import { useBaseStore } from '@/stores/base'

import PopupAddDoctor from '../components/PopupAddDoctor.vue'

const { setOpenPopup } = useBaseStore()

const search = ref<string>('')
const data = ref<IDoctor[]>([])
const query = ref<IQueryUser>({
  ...DEFAULT_QUERY_PAGINATION,
  search: ''
})

onMounted(() => {
  getAllDoctor()
})

const getAllDoctor = async () => {
  try {
    query.value.loading = true
    const rs = await apiDoctor.getAllDoctor(query.value)
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
