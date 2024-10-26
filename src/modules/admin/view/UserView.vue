<template>
  <div class="rounded-lg p-4">
    <div class="flex items-start justify-between">
      <BaseInput v-model="query.name" class="input-search" :show-icon="true" @change="handleSearch" />
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
  <PopupConfirmDelete
    :name="userRow.email"
    type="người dùng"
    :is-loading-button="isLoadingButton"
    @delete="deleteUser"
  />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiUser } from '@/services'

import type { IQueryFilter } from '@/types/admin.types'
import type { IUserTable } from '@/types/user.types'

import { useBaseStore } from '@/stores/base'

import PopupConfirmDelete from '../components/PopupConfirmDelete.vue'

const { setOpenPopup } = useBaseStore()

const query = ref<IQueryFilter>({
  ...DEFAULT_QUERY_PAGINATION,
  name: ''
})

const data = ref<IUserTable[]>([])
const userRow = ref<IUserTable>({} as IUserTable)
const isLoadingButton = ref<boolean>(false)

onMounted(() => {
  getAllUser()
})

const getAllUser = async (type: string = '') => {
  try {
    query.value.loading = true
    const rs = type === 'search' ? await apiUser.getAllUserByName(query.value) : await apiUser.getAllUser(query.value)
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
  setOpenPopup('popup-confirm-delete')
}

const deleteUser = async () => {
  try {
    isLoadingButton.value = true
    const rs = await apiUser.deteteUser([userRow.value.id])
    ElMessage.success(rs.message)
    setOpenPopup('popup-confirm-delete', false)
    isLoadingButton.value = false
    getAllUser()
  } catch (error) {
    isLoadingButton.value = false
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
const handleSearch = () => {
  query.value = {
    ...query.value,
    pageIndex: 1,
    pageSize: 10,
    totalElements: 0
  }
  getAllUser('search')
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
