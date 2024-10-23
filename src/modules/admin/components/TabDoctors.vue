<template>
  <div class="mt-3 flex justify-end">
    <BaseButton size="small" class="w-40" @click="setOpenPopup('popup-add-doctor-to-package')">Thêm bác sĩ</BaseButton>
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
  <PopupAddDoctortoPackage :is-loading-add="isLoading" @add="handleAdd" @cancel="handleCancel" />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiDepartment } from '@/services'

import type { IQuery } from '@/types/query.type'

import { useBaseStore } from '@/stores/base'

import PopupAddDoctortoPackage from './PopupAddDoctortoPackage.vue'

const { setOpenPopup } = useBaseStore()

interface IProps {
  departmentId: string
}
const props = withDefaults(defineProps<IProps>(), {
  departmentId: ''
})

onMounted(() => {
  getAllDoctorOfPackage()
})

const isLoading = ref<boolean>(false)
const data = ref<any[]>([])
const query = ref<IQuery>({
  ...DEFAULT_QUERY_PAGINATION
})
const handleCancel = () => {
  setOpenPopup('popup-add-doctor-to-package', false)
}
const handleAdd = async (id: string) => {
  try {
    isLoading.value = true
    const body = {
      departmentId: props.departmentId,
      doctorId: id
    }
    const rs = await apiDepartment.addDoctorDepartment(body)
    ElMessage.success(rs.message)
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}

const getAllDoctorOfPackage = async () => {
  try {
    query.value.loading = true
    const id = props.departmentId
    const rs = await apiDepartment.getAllDoctorOfDepartment(id)
    console.log('🚀 ~ getAllDoctorOfPackage ~ rs:', rs)
    query.value.loading = false
  } catch (error) {
    query.value.loading = false
    console.log(error)
  }
}
const handleLimitChange = (limit: unknown) => {
  query.value.pageSize = limit as number
  query.value.pageIndex = 1
  getAllDoctorOfPackage()
}

const handlePageChange = (page: unknown) => {
  query.value.pageIndex = page as number
  getAllDoctorOfPackage()
}
</script>

<style scoped></style>
