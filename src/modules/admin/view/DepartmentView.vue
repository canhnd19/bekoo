<template>
  <template v-if="!departmentIdActive">
    <div class="flex items-start justify-between">
      <BaseInput v-model="query.name" class="input-search" :show-icon="true" @change="handleSearch" />
      <BaseButton size="small" class="w-48" @click="handleAddDepartment">Thêm chuyên khoa</BaseButton>
    </div>
    <BaseTable
      v-model:page="query.pageIndex"
      v-model:limit="query.pageSize"
      :data="data"
      :query="query"
      class="mt-6"
      label="chuyên khoa"
      @page-change="handlePageChange"
      @limit-change="handleLimitChange"
      @row-click="rowClick"
    >
      <ElTableColumn
        type="index"
        :index="(index: number) => printIndex(index, query)"
        width="75"
        label="#"
        align="center"
      />
      <ElTableColumn label="tên">
        <template #default="{ row }">
          <p>{{ row.name }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="hành động" align="right">
        <template #default="{ row }">
          <div class="flex items-center justify-end space-x-3">
            <BaseIcon name="edit" @click="handleEditDepartment(row)" />
            <BaseIcon name="delete" @click="handleDelete(row)" />
          </div>
        </template>
      </ElTableColumn>
    </BaseTable>
  </template>
  <template v-else>
    <div class="flex items-center justify-start">
      <BaseIcon name="back" class="mr-3 cursor-pointer" @click="departmentIdActive = ''" />
      <p class="text-lg">{{ departmentRow.name }}</p>
    </div>
    <div class="pb-6 pt-4">
      <BaseTab v-model="tabActive" :tabs="tabs" />
      <component :is="component" :department-id="departmentIdActive" />
    </div>
  </template>
  <PopupAddOrEditDepartment :data="departmentRow" :type-action="typeAction" @add-or-edit="addDepartment" />
  <PopupConfirmDelete
    :name="departmentRow.name"
    type="chuyên khoa"
    :is-loading-button="isLoadingButton"
    @delete="deleteDepartment"
  />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiDepartment } from '@/services'

import type { ITab } from '@/types/component.types'
import type { IDepartment, QueryDepartment } from '@/types/department.types'

import { useBaseStore } from '@/stores/base'

import PopupAddOrEditDepartment from '../components/PopupAddOrEditDepartment.vue'
import PopupConfirmDelete from '../components/PopupConfirmDelete.vue'
import TabDoctors from '../components/TabDoctors.vue'
import TabSpecializes from '../components/TabSpecializes.vue'

const { setOpenPopup } = useBaseStore()
const tabs = ref<ITab[]>([
  {
    id: 1,
    title: 'Bác sĩ',
    tabValue: 'doctors'
  },
  {
    id: 2,
    title: 'Gói khám',
    tabValue: 'specialize'
  }
])

const typeAction = ref<'ADD' | 'EDIT' | ''>('')
const tabActive = ref<string>('doctors')
const data = ref<IDepartment[]>([])
const departmentRow = ref<IDepartment>({} as IDepartment)
const departmentIdActive = ref<string>('')
const isLoadingButton = ref<boolean>(false)
const isConflictClick = ref<boolean>(false)
const query = ref<QueryDepartment>({
  ...DEFAULT_QUERY_PAGINATION,
  name: ''
})
const component = computed(() => {
  return tabActive.value === 'doctors' ? TabDoctors : TabSpecializes
})
onMounted(() => {
  getListDepartment()
})

const getListDepartment = async () => {
  try {
    query.value.loading = true
    const rs = await apiDepartment.getAllDepartmentByName(query.value)
    data.value = rs.value.contentResponse
    query.value.totalElements = rs.value.totalElements
    query.value.loading = false
  } catch (error) {
    query.value.loading = false
    console.log(error)
  }
}

const handleAddDepartment = () => {
  typeAction.value = 'ADD'
  setOpenPopup('popup-add-or-edit-department')
}
const handleEditDepartment = (data: IDepartment) => {
  typeAction.value = 'EDIT'
  isConflictClick.value = true
  departmentRow.value = data
  setOpenPopup('popup-add-or-edit-department')
}

const handleDelete = (data: IDepartment) => {
  isConflictClick.value = true
  departmentRow.value = data
  setOpenPopup('popup-confirm-delete')
}

const deleteDepartment = async () => {
  try {
    isLoadingButton.value = true
    const rs = await apiDepartment.deteteDepartment(departmentRow.value.id)
    ElMessage.success(rs.message)
    setOpenPopup('popup-confirm-delete', false)
    isLoadingButton.value = false
    getListDepartment()
  } catch (error) {
    isLoadingButton.value = false
    console.log(error)
  }
}

const rowClick = (data: IDepartment) => {
  if (isConflictClick.value) {
    isConflictClick.value = false
    return
  }
  departmentRow.value = data
  departmentIdActive.value = data.id
}

const handleLimitChange = (limit: unknown) => {
  query.value.pageSize = limit as number
  query.value.pageIndex = 1
  getListDepartment()
}

const handlePageChange = (page: unknown) => {
  query.value.pageIndex = page as number
  getListDepartment()
}
const handleSearch = () => {
  query.value = {
    ...query.value,
    pageIndex: 1,
    pageSize: 10,
    totalElements: 0
  }
  getListDepartment()
}

const addDepartment = () => {
  getListDepartment()
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
