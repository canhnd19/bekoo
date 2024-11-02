<template>
  <template v-if="!doctorId">
    <div class="flex items-start justify-between">
      <BaseInput v-model="query.name" class="input-search" :show-icon="true" @change="handleSearch" />
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
      @row-click="rowClick"
    >
      <ElTableColumn type="index" :index="(index: number) => printIndex(index, query)" label="#" align="center" />
      <ElTableColumn label="tên" min-width="162">
        <template #default="{ row }">
          <p>{{ row.info.name }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="học vấn" min-width="112">
        <template #default="{ row }">
          <p>{{ row.trainingBy }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="email" min-width="200">
        <template #default="{ row }">
          <p>{{ row.info.email }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="số điện thoại" width="192">
        <template #default="{ row }">
          <p>{{ row.info.phoneNumber }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="giới tính" min-width="112">
        <template #default="{ row }">
          <p>{{ row.info.gender }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="số lượng bệnh nhân hôm nay" min-width="300" align="right">
        <template #default="{ row }">
          <p>{{ row.totalPatientsVisited }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="số lượng bệnh nhân tối đa / ngày" min-width="320" align="right">
        <template #default="{ row }">
          <p>{{ row.maximumPeoplePerDay }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="ACTION" width="120" align="right">
        <template #default="{ row }">
          <div class="flex items-center justify-end space-x-3">
            <BaseIcon name="edit" @click="handleActionDoctor(row, 'EDIT')" />
            <BaseIcon name="delete" @click="handleActionDoctor(row, 'DELETE')" />
          </div>
        </template>
      </ElTableColumn>
    </BaseTable>
  </template>
  <template v-else>
    <div class="flex items-center justify-start">
      <BaseIcon name="back" class="mr-3 cursor-pointer" @click="doctorId = ''" />
      <p class="text-lg">{{ doctorRow.info.name }}</p>
    </div>
    <div class="pb-6 pt-4">
      <BaseTab v-model="tabActive" :tabs="tabs" />
      <component :is="component" :doctor-id="doctorId" />
    </div>
  </template>
  <PopupAddDoctor @created="getAllDoctor" />
  <PopupConfirmDelete
    :name="doctorRow.info?.email"
    type="bác sĩ"
    :is-loading-button="isLoadingButton"
    @delete="deleteDoctor"
  />
  <PopupEditDoctor
    :is-loading-button="isLoadingButton"
    @cancel="setOpenPopup('popup-edit-doctor', false)"
    @edit="editDcotor"
  />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
// import router from '@/router'
import { apiDoctor } from '@/services'

import type { IQueryFilter } from '@/types/admin.types'
import type { ITab } from '@/types/component.types'
import type { IDoctor } from '@/types/doctor.types'

import { useBaseStore } from '@/stores/base'

import PopupAddDoctor from '../components/PopupAddDoctor.vue'
import PopupConfirmDelete from '../components/PopupConfirmDelete.vue'
import PopupEditDoctor from '../components/PopupEditDoctor.vue'
import TabAllDays from '../components/TabAllDays.vue'
import TabDay from '../components/TabDay.vue'

const { setOpenPopup } = useBaseStore()
const doctorId = ref<string>('')
const tabActive = ref<string>('day')
const isConflictClick = ref<boolean>(false)
const data = ref<IDoctor[]>([])
const doctorRow = ref<IDoctor>({} as IDoctor)
const isLoadingButton = ref<boolean>(false)
const query = ref<IQueryFilter>({
  ...DEFAULT_QUERY_PAGINATION,
  name: ''
})
const tabs = ref<ITab[]>([
  {
    id: 1,
    title: 'Hôm nay',
    tabValue: 'day'
  },
  {
    id: 2,
    title: 'Tất cả',
    tabValue: 'allDays'
  }
])
onMounted(() => {
  getAllDoctor()
})

const getAllDoctor = async (type: string = '') => {
  try {
    query.value.loading = true
    const rs =
      type === 'search'
        ? await apiDoctor.getAllDoctorByName(query.value.name, query.value)
        : await apiDoctor.getAllDoctor(query.value)
    data.value = rs.value.contentResponse
    query.value.totalElements = rs.value.totalElements
    query.value.loading = false
  } catch (error) {
    query.value.loading = false
    console.log(error)
  }
}
const handleActionDoctor = (data: IDoctor, type: string) => {
  isConflictClick.value = true
  doctorRow.value = data
  type === 'EDIT' ? setOpenPopup('popup-edit-doctor') : setOpenPopup('popup-confirm-delete')
}

const editDcotor = async (value: string) => {
  try {
    isLoadingButton.value = true
    const body = {
      id: doctorRow.value.id,
      value
    }
    const rs = await apiDoctor.setPatientADay(body)
    ElMessage.success(rs.message)
    isLoadingButton.value = false
    setOpenPopup('popup-edit-doctor', false)
    getAllDoctor()
  } catch (error) {
    isLoadingButton.value = false
    console.log(error)
  }
}

const deleteDoctor = async () => {
  try {
    isLoadingButton.value = true
    const rs = await apiDoctor.deteteDoctor([doctorRow.value.id])
    ElMessage.success(rs.message)
    setOpenPopup('popup-confirm-delete', false)
    isLoadingButton.value = false
    getAllDoctor()
  } catch (error) {
    isLoadingButton.value = false
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
const handleSearch = () => {
  query.value = {
    ...query.value,
    pageIndex: 1,
    pageSize: 10,
    totalElements: 0
  }
  getAllDoctor('search')
}
const rowClick = (data: IDoctor) => {
  if (isConflictClick.value) {
    isConflictClick.value = false
    return
  }
  doctorRow.value = data
  doctorId.value = data.id
  // router.push({ name: 'MedicalSchedule', params: { id: data.id } })
}
const component = computed(() => {
  return tabActive.value === 'day' ? TabDay : TabAllDays
})
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
