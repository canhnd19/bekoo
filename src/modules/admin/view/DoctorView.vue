<template>
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
    label="doctor"
    @page-change="handlePageChange"
    @limit-change="handleLimitChange"
  >
    <ElTableColumn type="index" :index="(index: number) => printIndex(index, query)" label="#" align="center" />
    <ElTableColumn label="NAME">
      <template #default="{ row }">
        <p>{{ row.info.name }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="EMAIL">
      <template #default="{ row }">
        <p>{{ row.info.email }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="PHONE NUMBER" width="200">
      <template #default="{ row }">
        <p>{{ row.info.phoneNumber }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="GENDER" width="90">
      <template #default="{ row }">
        <p>{{ row.info.gender }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="ACTION" width="120" align="right">
      <template #default="{ row }">
        <div class="flex items-center justify-end space-x-3">
          <!-- <BaseIcon name="edit" @click="handleEditUser" /> -->
          <BaseIcon name="delete" @click="handleDeleteUser(row)" />
        </div>
      </template>
    </ElTableColumn>
  </BaseTable>
  <PopupAddDoctor @created="getAllDoctor" />
  <PopupConfirmDeleteUser :email="doctorRow.info?.email" :is-loading-delete="isLoadingDelete" @delete="deleteDoctor" />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiDoctor } from '@/services'

import type { IQueryUser } from '@/types/admin.types'
import type { IDoctor } from '@/types/doctor.types'

import { useBaseStore } from '@/stores/base'

import PopupAddDoctor from '../components/PopupAddDoctor.vue'
import PopupConfirmDeleteUser from '../components/PopupConfirmDeleteUser.vue'

const { setOpenPopup } = useBaseStore()

const search = ref<string>('')
const data = ref<IDoctor[]>([])
const doctorRow = ref<IDoctor>({} as IDoctor)
const isLoadingDelete = ref<boolean>(false)
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
    query.value.totalElements = rs.value.totalElements
    query.value.loading = false
  } catch (error) {
    query.value.loading = false
    console.log(error)
  }
}

const handleDeleteUser = (data: IDoctor) => {
  doctorRow.value = data
  setOpenPopup('popup-confirm-delete-user')
}

const deleteDoctor = async () => {
  try {
    isLoadingDelete.value = true
    const rs = await apiDoctor.deteteDoctor([doctorRow.value.id])
    ElMessage.success(rs.message)
    setOpenPopup('popup-confirm-delete-user', false)
    isLoadingDelete.value = false
    getAllDoctor()
  } catch (error) {
    isLoadingDelete.value = false
    console.log(error)
  }
}

const handleLimitChange = (limit: unknown) => {
  query.value.pageSize = limit as number
  query.value.pageIndex = 1
  getAllDoctor()
}

const handlePageChange = (page: unknown) => {
  query.value.pageIndex = page as number
  getAllDoctor()
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
