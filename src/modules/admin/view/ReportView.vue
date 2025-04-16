<template>
  <BaseSummary :data-summary="dataSummary" :is-loading="isLoading" />
  <div class="mb-10">
    <p class="mt-4 text-2xl font-semibold">Biểu đồ thống kê bệnh nhân đặt lịch khám</p>
    <BaseSelect v-model="daysActive" placeholder="" class="select" :clearable="false" @change="initChart">
      <ElOption v-for="(item, index) in FILTER_DAYS" :key="index" :label="item.label" :value="item.value" />
    </BaseSelect>
    <BaseChart :label="labelChart" :legend-chart="legendChart" :datasets="datasets" :is-loading="isLoadingChart" />
  </div>
  <p class="mt-4 text-2xl font-semibold">Biểu đồ thống kê doanh thu</p>
  <BaseSelect v-model="daysActiveRevenue" placeholder="" class="select" :clearable="false" @change="initChartRevenue">
    <ElOption v-for="(item, index) in FILTER_DAYS" :key="index" :label="item.label" :value="item.value" />
  </BaseSelect>
  <BaseChart
    :label="labelChartRevenue"
    :legend-chart="legendChartRevenue"
    :datasets="datasetsRevenue"
    :is-loading="isLoadingChartRevenue"
  />
  <p class="my-10 text-2xl font-semibold">Biểu đồ thống kê độ tuổi bệnh nhân</p>
  <BaseChartPie :datasets="ageData" :is-loading="isLoadingChartByAge" />
</template>

<script setup lang="ts">
import { apiReport } from '@/services'
import { useDateFormat } from '@vueuse/core'
import type { ChartDataset } from 'chart.js'
import { forEach } from 'lodash-es'
import { onMounted, ref } from 'vue'

import type { IReport, ISummary } from '@/types/user.types'

import { useConvertUTCTime } from '@/composables/useConvertUTCTime'
import useFormatNumber from '@/composables/useFormatNumber'

import BaseChart, { type VALUE_DAY } from '../components/BaseChart.vue'
import BaseChartPie from '../components/BaseChartPie.vue'
import BaseSummary from '../components/BaseSummary.vue'
import { FILTER_DAYS } from '../constants/index'

onMounted(() => {
  Promise.all([initChart(), getDataReport(), chartByAge(), initChartRevenue()])
})
const daysActive = ref<VALUE_DAY>('7_DAYS')
const daysActiveRevenue = ref<VALUE_DAY>('7_DAYS')
const isLoading = ref<boolean>(false)
const isLoadingChart = ref<boolean>(false)
const isLoadingChartRevenue = ref<boolean>(false)
const isLoadingChartByAge = ref<boolean>(false)
const valueSummary = ref<IReport>({
  totalDepartment: 0,
  totalDoctor: 0,
  totalPatient: 0,
  totalSchedule: 0,
  totalSpecialize: 0
})
const ageData = ref<{ range: string; value: number }[]>([])
const labelChart = ref<string[]>([])
const labelChartRevenue = ref<string[]>([])
const datasets = ref<ChartDataset[]>([])
const datasetsRevenue = ref<ChartDataset[]>([])
const legendChart = ref<Array<Record<string, any>>>([
  {
    name: 'Số lượng bệnh nhân',
    color: '#0A94FF'
  }
])

const legendChartRevenue = ref<Array<Record<string, any>>>([
  {
    name: 'Doanh thu',
    color: '#00A811'
  }
])
const params = ref<Record<string, any>>({
  groupType: 1,
  fromDate: '',
  toDate: ''
})
const paramsRevenue = ref<Record<string, any>>({
  groupType: 1,
  fromDate: '',
  toDate: ''
})

const dataSummary = computed((): ISummary[] => {
  return [
    {
      title: 'Tổng số bác sĩ',
      icon: 'total-doctor',
      color: '#0151FC',
      value: valueSummary.value.totalDoctor
    },
    {
      title: 'Tổng số bệnh nhân',
      icon: 'menu-user',
      color: '#FD2E58',
      value: valueSummary.value.totalPatient
    },
    {
      title: 'Tổng số chuyên khoa',
      icon: 'total-department',
      color: '#00A811',
      value: valueSummary.value.totalDepartment
    },
    {
      title: 'Tổng số gói khám',
      icon: 'total-package',
      color: '#FF9E0C',
      value: valueSummary.value.totalSpecialize
    },
    {
      title: 'Tổng số lượt đặt khám',
      icon: 'total-booking',
      color: '#FF4A4A',
      value: valueSummary.value.totalSchedule
    }
  ]
})
const getDataReport = async () => {
  try {
    isLoading.value = true
    const rs = await apiReport.getDataReport()
    valueSummary.value = { ...rs.value }
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}

const getDayStartAndEnd = () => {
  const now = new Date()
  const endDate = useConvertUTCTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) as any, 'TO')
  const dayDiff = daysActive.value.split('_')[0]
  const dayDiffRevenue = daysActiveRevenue.value.split('_')[0]
  const startDate = useConvertUTCTime(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - Number(dayDiff), 0, 0, 0, 0) as any,
    'FROM'
  )
  const startDateRevenue = useConvertUTCTime(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - Number(dayDiffRevenue), 0, 0, 0, 0) as any,
    'FROM'
  )
  params.value.fromDate = startDate
  params.value.toDate = endDate
  paramsRevenue.value.fromDate = startDateRevenue
  paramsRevenue.value.toDate = endDate
}

const initChart = async () => {
  try {
    isLoadingChart.value = true
    getDayStartAndEnd()
    const paramsReq = {
      ...params.value,
      groupType: daysActive.value === '360_DAYS' ? 3 : 1
    }
    const rs = await apiReport.getDataChartReport(paramsReq)
    mapChart(rs)
    isLoadingChart.value = false
  } catch (error) {
    isLoadingChart.value = false
    console.log(error)
  }
}

const initChartRevenue = async () => {
  try {
    isLoadingChartRevenue.value = true
    getDayStartAndEnd()
    const paramsReq = {
      ...paramsRevenue.value,
      groupType: daysActiveRevenue.value === '360_DAYS' ? 3 : 1
    }
    const rs = await apiReport.getDataChartRevenueStatistics(paramsReq)
    mapChartRevenue(rs)
    isLoadingChartRevenue.value = false
  } catch (error) {
    isLoadingChartRevenue.value = false
    console.log(error)
  }
}

const chartByAge = async () => {
  try {
    isLoadingChartByAge.value = true
    const rs = await apiReport.getDataChartAge()
    ageData.value = rs.value
    isLoadingChartByAge.value = false
  } catch (error) {
    console.log(error)
    isLoadingChartByAge.value = false
  }
}

const mapChart = (data: any) => {
  labelChart.value = []
  datasets.value = []
  const _data: number[] = []
  forEach(data.value, (value) => {
    labelChart.value.push(useDateFormat(value.time, 'MMMM DD').value)
    _data.push(value.value)
  })
  datasets.value.push({
    label: 'Số lượng bệnh nhân',
    data: _data,
    tension: 0.2,
    borderColor: '#027BFE'
  })
}

const mapChartRevenue = (data: any) => {
  labelChartRevenue.value = []
  datasetsRevenue.value = []
  const _data: number[] = []
  forEach(data.value, (value) => {
    labelChartRevenue.value.push(useDateFormat(value.time, 'MMMM DD').value)
    _data.push(+useFormatNumber(value.value))
  })
  datasetsRevenue.value.push({
    label: 'Doanh thu',
    data: _data,
    tension: 0.2,
    borderColor: '#00A811'
  })
}
</script>

<style scoped lang="scss">
.select {
  :deep(.el-select) {
    margin-top: 16px;
    width: 150px;
    .el-select__wrapper {
      height: 40px;
      border-radius: 8px;
      .el-select__placeholder {
        font-size: 16px;
      }
    }
  }
}
</style>
