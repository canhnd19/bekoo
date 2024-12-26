<template>
  <template v-if="!doctorId">
    <div class="flex items-start justify-between">
      <BaseInput v-model="query.name" class="input-search" :show-icon="true" @change="handleSearch" />
      <BaseButton size="small" class="w-44" @click="setOpenPopup('popup-add-doctor')">Thêm bác sĩ</BaseButton>
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
      @row-click="rowClick"
    >
      <ElTableColumn
        type="index"
        :index="(index: number) => printIndex(index, query)"
        width="75"
        label="#"
        align="center"
      />
      <ElTableColumn label="tên" width="240">
        <template #default="{ row }">
          <p>{{ row.info.name }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="học vấn" width="116" align="center">
        <template #default="{ row }">
          <p>{{ row.trainingBy }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="email" width="300">
        <template #default="{ row }">
          <p>{{ row.info.email }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="số điện thoại" width="192">
        <template #default="{ row }">
          <p>{{ row.info.phoneNumber }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="giới tính" min-width="112" align="center">
        <template #default="{ row }">
          <p>{{ row.info.gender }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="số lượng bệnh nhân đã đặt khám" min-width="320" align="right">
        <template #default="{ row }">
          <p>{{ row.totalPatientsVisited }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="số lượng bệnh nhân tối đa / ngày" min-width="320" align="right">
        <template #default="{ row }">
          <p>{{ row.maximumPeoplePerDay }}</p>
        </template>
      </ElTableColumn>
      <ElTableColumn label="hành động" width="120" align="right">
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
      <component
        :is="component"
        :doctor-id="doctorId"
        :label="labelChart"
        :legend-chart="legendChart"
        :datasets="datasets"
        :is-loading="isLoading"
        @filter="handleFilter"
      />
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
    :doctor="doctorRow"
    @cancel="setOpenPopup('popup-edit-doctor', false)"
    @edit="editDcotor"
  />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
// import router from '@/router'
import { apiDoctor, apiReport } from '@/services'
import { useDateFormat } from '@vueuse/core'
import type { ChartDataset } from 'chart.js'
import { forEach } from 'lodash-es'

import type { ITab } from '@/types/component.types'
import type { IDoctor, QueryDoctor } from '@/types/doctor.types'

import { useConvertUTCTime } from '@/composables/useConvertUTCTime'

import { useBaseStore } from '@/stores/base'

import BaseChart, { type VALUE_DAY } from '../components/BaseChart.vue'
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
const query = ref<QueryDoctor>({
  ...DEFAULT_QUERY_PAGINATION,
  name: ''
})
const isLoading = ref<boolean>(false)
const daysActive = ref<VALUE_DAY>('7_DAYS')
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
  },
  {
    id: 3,
    title: 'Biểu đồ thống kê bệnh nhân đặt lịch khám',
    tabValue: 'chart'
  }
])

const labelChart = ref<string[]>([])
const datasets = ref<ChartDataset[]>([])
const legendChart = ref<Array<Record<string, any>>>([
  {
    name: 'Số bệnh nhân',
    color: '#0A94FF'
  }
])

const params = ref<Record<string, any>>({
  groupType: 1,
  fromDate: '',
  toDate: ''
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
const handleActionDoctor = (data: IDoctor, type: string) => {
  isConflictClick.value = true
  doctorRow.value = data
  type === 'EDIT' ? setOpenPopup('popup-edit-doctor') : setOpenPopup('popup-confirm-delete')
}

const editDcotor = async (value: { maxPaitentADay: number; trainingBy: string }) => {
  try {
    isLoadingButton.value = true
    if (value.maxPaitentADay && !value.trainingBy) {
      const body = {
        id: doctorRow.value.id,
        value: value.maxPaitentADay
      }
      const rs = await apiDoctor.setPatientADay(body)
      ElMessage.success(rs.message)
    }
    if (value.trainingBy && !value.maxPaitentADay) {
      const body = {
        id: doctorRow.value.id,
        trainingBy: value.trainingBy
      }
      const rs = await apiDoctor.editDoctor(body)
      ElMessage.success(rs.message)
    }
    if (value.maxPaitentADay && value.trainingBy) {
      const bodyMaxPaitentADay = {
        id: doctorRow.value.id,
        value: value.maxPaitentADay
      }
      const bodyTrainingBy = {
        id: doctorRow.value.id,
        trainingBy: value.trainingBy
      }
      const rs = await Promise.all([apiDoctor.setPatientADay(bodyMaxPaitentADay), apiDoctor.editDoctor(bodyTrainingBy)])
      ElMessage.success(rs[1].message)
    }
    setOpenPopup('popup-edit-doctor', false)
    isLoadingButton.value = false
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
  getAllDoctor()
}
const rowClick = (data: IDoctor) => {
  if (isConflictClick.value) {
    isConflictClick.value = false
    return
  }
  doctorRow.value = data
  doctorId.value = data.id
  initChart()
  // router.push({ name: 'MedicalSchedule', params: { id: data.id } })
}
const component = computed(() => {
  if (tabActive.value === 'day') return TabDay
  else if (tabActive.value === 'allDays') return TabAllDays
  else return BaseChart
})
const handleFilter = (data: unknown) => {
  daysActive.value = data as VALUE_DAY
  initChart()
}

const getDayStartAndEnd = () => {
  const now = new Date()
  const endDate = useConvertUTCTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0), 'TO')
  const dayDiff = daysActive.value.split('_')[0]
  const startDate = useConvertUTCTime(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - Number(dayDiff), 0, 0, 0, 0),
    'FROM'
  )
  params.value.fromDate = startDate
  params.value.toDate = endDate
}

const initChart = async () => {
  try {
    isLoading.value = true
    getDayStartAndEnd()
    const paramsReq = {
      ...params.value,
      groupType: daysActive.value === '360_DAYS' ? 3 : 1
    }
    const rs = await apiReport.getDataChartDoctor({ ...paramsReq, doctorId: doctorId.value })
    mapChart(rs)
    isLoading.value = false
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const mapChart = (data: any) => {
  labelChart.value = []
  datasets.value = []
  const _data: number[] = []
  forEach(data.value, (value) => {
    labelChart.value.push(useDateFormat(value.time, 'MMM DD').value)
    _data.push(value.value)
  })
  datasets.value.push({
    label: 'Số lượng bệnh nhân',
    data: _data,
    tension: 0.2,
    borderColor: '#027BFE'
  })
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
