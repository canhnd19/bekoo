<template>
  <div class="mt-3 flex justify-end">
    <BaseButton size="small" class="w-40" @click="setOpenPopup('popup-add-exmination-package')"
      >Thêm gói khám</BaseButton
    >
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
  </BaseTable>
  <PopupAddExminationPackage :is-loading="isLoading" @add="handleAdd" @cancel="handleCancel" />
  <PopupConfirmDelete :name="packageRow.name" :is-loading-delete="isLoadingDelete" @delete="deleteDepartment" />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiSpecialize } from '@/services'

import type { IPackage } from '@/types/package.types'
import type { IQuery } from '@/types/query.type'

import { useBaseStore } from '@/stores/base'

import PopupAddExminationPackage from './PopupAddExminationPackage.vue'
import PopupConfirmDelete from './PopupConfirmDelete.vue'

const { setOpenPopup } = useBaseStore()

interface IProps {
  departmentId: string
}
onMounted(() => {
  getAllPackage()
})
const packageRow = ref<IPackage>({} as IPackage)
const data = ref<IPackage[]>([])
const isLoading = ref<boolean>(false)
const isLoadingDelete = ref<boolean>(false)
const props = withDefaults(defineProps<IProps>(), {
  departmentId: ''
})
const query = ref<IQuery>({
  ...DEFAULT_QUERY_PAGINATION
})
const handleCancel = () => {
  setOpenPopup('popup-add-exmination-package', false)
}
const handleAdd = async (data: Record<string, any>) => {
  try {
    isLoading.value = true
    const departmentId = props.departmentId
    const rs = await apiSpecialize.createPackage({ ...data, departmentId })
    ElMessage.success(rs.message)
    setOpenPopup('popup-add-exmination-package', false)
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}

const getAllPackage = async () => {
  try {
    query.value.loading = true
    const rs = await apiSpecialize.getAllPackage(query.value)
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
  getAllPackage()
}

const handlePageChange = (page: unknown) => {
  query.value.pageIndex = page as number
  getAllPackage()
}
const handleDelete = (data: IPackage) => {
  packageRow.value = data
  setOpenPopup('popup-confirm-delete')
}

const deleteDepartment = async () => {
  try {
    isLoadingDelete.value = true
    const rs = await apiSpecialize.detetePackage(packageRow.value.id)
    ElMessage.success(rs.message)
    setOpenPopup('popup-confirm-delete', false)
    isLoadingDelete.value = false
    getAllPackage()
  } catch (error) {
    isLoadingDelete.value = false
    console.log(error)
  }
}
</script>

<style scoped lang="scss"></style>
