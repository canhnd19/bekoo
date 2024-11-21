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
    label="bác sĩ"
    @page-change="handlePageChange"
    @limit-change="handleLimitChange"
  >
    <ElTableColumn type="index" :index="(index: number) => printIndex(index, query)" label="#" align="center" />
    <ElTableColumn label="tên">
      <template #default="{ row }">
        <p>{{ row.info.name }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="EMAIL">
      <template #default="{ row }">
        <p>{{ row.info.email }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="số điện thoại" width="200">
      <template #default="{ row }">
        <p>{{ row.info.phoneNumber }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="giới tính" width="90">
      <template #default="{ row }">
        <p>{{ row.info.gender }}</p>
      </template>
    </ElTableColumn>
    <ElTableColumn label="hành động" width="120" align="right">
      <template #default="{ row }">
        <div class="flex items-center justify-end space-x-3">
          <!-- <BaseIcon name="edit" @click="handleEditUser" /> -->
          <BaseIcon name="delete" @click="handleDeleteUser(row)" />
        </div>
      </template>
    </ElTableColumn>
  </BaseTable>
  <PopupAddDoctortoPackage :is-loading-add="isLoading" @add="handleAdd" @cancel="handleCancel" />
  <PopupConfirmDelete
    :name="doctorRow.info?.email"
    type="bác sĩ"
    :is-loading-button="isLoadingButton"
    @delete="deleteDoctor"
  />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiDepartment } from '@/services'

import type { IDoctor } from '@/types/doctor.types'
import type { IQuery } from '@/types/query.type'

import { useBaseStore } from '@/stores/base'

import PopupAddDoctortoPackage from './PopupAddDoctortoPackage.vue'
import PopupConfirmDelete from './PopupConfirmDelete.vue'

const { setOpenPopup } = useBaseStore()

interface IProps {
  departmentId: string
}
const props = withDefaults(defineProps<IProps>(), {
  departmentId: ''
})

onMounted(() => {
  getListDoctorOfDepartment()
})
const doctorRow = ref<IDoctor>({} as IDoctor)
const isLoadingButton = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const data = ref<IDoctor[]>([])
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
    setOpenPopup('popup-add-doctor-to-package', false)
    getListDoctorOfDepartment()
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}

const getListDoctorOfDepartment = async () => {
  try {
    query.value.loading = true
    const id = props.departmentId
    const rs = await apiDepartment.getListDoctorOfDepartment(id, query.value)
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
  getListDoctorOfDepartment()
}

const handlePageChange = (page: unknown) => {
  query.value.pageIndex = page as number
  getListDoctorOfDepartment()
}
const handleDeleteUser = (data: IDoctor) => {
  doctorRow.value = data
  setOpenPopup('popup-confirm-delete')
}

const deleteDoctor = async () => {
  try {
    isLoadingButton.value = true
    const body = {
      departmentId: props.departmentId,
      doctorId: doctorRow.value.id
    }
    const rs = await apiDepartment.deleteDoctorDepartment({
      values: [body]
    })
    ElMessage.success(rs.message)
    setOpenPopup('popup-confirm-delete', false)
    isLoadingButton.value = false
    getListDoctorOfDepartment()
  } catch (error) {
    isLoadingButton.value = false
    console.log(error)
  }
}
</script>

<style scoped></style>
