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
      @page-change="handlePageChange"
      @limit-change="handleLimitChange"
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
      <ElTableColumn label="PHONE NUMBER" width="200">
        <template #default="{ row }">
          <p>{{ row.phoneNumber }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="GENDER" width="90">
        <template #default="{ row }">
          <p>{{ row.gender }}</p>
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
  <PopupConfirmDeleteUser :email="userRow.email" :is-loading-delete="isLoadingDelete" @delete="deleteUser" />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiUser } from '@/services'

import type { IQueryUser } from '@/types/admin.types'
import type { IUserTable } from '@/types/user.types'

import { useBaseStore } from '@/stores/base'

import PopupConfirmDeleteUser from '../components/PopupConfirmDeleteUser.vue'

const { setOpenPopup } = useBaseStore()

const query = ref<IQueryUser>({
  ...DEFAULT_QUERY_PAGINATION,
  search: ''
})

const data = ref<IUserTable[]>([])
const userRow = ref<IUserTable>({} as IUserTable)
const isLoadingDelete = ref<boolean>(false)

onMounted(() => {
  getAllUser()
})

const getAllUser = async () => {
  try {
    query.value.loading = true
    const rs = await apiUser.getAllUser(query.value)
    data.value = rs.value.contentResponse
    query.value.totalElements = rs.value.totalElements
    query.value.loading = false
  } catch (error) {
    query.value.loading = false
    console.log(error)
  }
}

const handleEditUser = () => {}

const handleDeleteUser = (data: IUserTable) => {
  userRow.value = data
  setOpenPopup('popup-confirm-delete-user')
}

const deleteUser = async () => {
  try {
    isLoadingDelete.value = true
    const rs = await apiUser.deteteUser([userRow.value.id])
    ElMessage.success(rs.message)
    setOpenPopup('popup-confirm-delete-user', false)
    isLoadingDelete.value = false
    getAllUser()
  } catch (error) {
    isLoadingDelete.value = false
    console.log(error)
  }
}
const handleLimitChange = (limit: unknown) => {
  query.value.pageSize = limit as number
  query.value.pageIndex = 1
  getAllUser()
}

const handlePageChange = (page: unknown) => {
  query.value.pageIndex = page as number
  getAllUser()
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
