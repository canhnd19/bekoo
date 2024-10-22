<template>
  <div class="flex items-start justify-between">
    <BaseInput v-model="search" class="input-search" :show-icon="true" />
    <BaseButton size="small" class="w-20" @click="setOpenPopup('popup-add-department')">Add</BaseButton>
  </div>
  <BaseTable
    v-model:page="query.pageIndex"
    v-model:limit="query.pageSize"
    :data="data"
    :query="query"
    class="mt-6"
    label="user"
    @page-change="getAllDepartment"
    @limit-change="getAllDepartment"
  >
    <ElTableColumn type="index" :index="(index: number) => printIndex(index, query)" label="#" align="center" />
    <ElTableColumn label="NAME">
      <template #default="{ row }">
        <p>{{ row.name }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="ACTION">
      <template #default="{ row }">
        <div class="flex items-center justify-end space-x-3">
          <!-- <BaseIcon name="edit" @click="handleEditUser" /> -->
          <BaseButton type="plain" size="small" class="w-40">Thêm bác sĩ</BaseButton>
          <BaseIcon name="delete" @click="handleDeleteUser(row)" />
        </div>
      </template>
    </ElTableColumn>
  </BaseTable>
  <PopupAddDepartment />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiDepartment } from '@/services'

import type { IQueryUser } from '@/types/admin.types'
import type { IDepartment } from '@/types/department.types'

import { useBaseStore } from '@/stores/base'

import PopupAddDepartment from '../components/PopupAddDepartment.vue'

const { setOpenPopup } = useBaseStore()

const search = ref<string>('')
const data = ref<IDepartment[]>([])
const departmentRow = ref<IDepartment>({} as IDepartment)
// const isLoadingDelete = ref<boolean>(false)
const query = ref<IQueryUser>({
  ...DEFAULT_QUERY_PAGINATION,
  search: ''
})

onMounted(() => {
  getAllDepartment()
})

const getAllDepartment = async () => {
  try {
    query.value.loading = true
    const rs = await apiDepartment.getAllDepartment(query.value)
    data.value = rs.value.contentResponse
    query.value.totalPage = rs.value.totalPage
    query.value.loading = false
  } catch (error) {
    query.value.loading = false
    console.log(error)
  }
}

const handleDeleteUser = (data: IDepartment) => {
  departmentRow.value = data
  setOpenPopup('popup-confirm-delete-user')
}

// const deleteUser = async () => {
//   try {
//     isLoadingDelete.value = true
//     const rs = await apiDoctor.deteteDoctor([departmentRow.value.id])
//     ElMessage.success(rs.message)
//     setOpenPopup('popup-confirm-delete-user', false)
//     isLoadingDelete.value = false
//     getAllDepartment()
//   } catch (error) {
//     isLoadingDelete.value = false
//     console.log(error)
//   }
// }
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
