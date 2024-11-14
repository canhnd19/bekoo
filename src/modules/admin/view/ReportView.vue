<template>
  <BaseSummary :data-summary="dataSummary" :is-loading="isLoading" />
  <p class="mt-4 text-2xl font-semibold">Biểu đồ thống kê bệnh nhân đặt lịch khám</p>
  <BaseChart
    :label="labelChart"
    :legend-chart="legendChart"
    :datasets="datasets"
    :is-loading="isLoadingChart"
    @filter="handleFilter"
  />
</template>

<script setup lang="ts">
import { apiReport } from '@/services'
import { useDateFormat } from '@vueuse/core'
import type { ChartDataset } from 'chart.js'
import { forEach } from 'lodash-es'

import type { IReport, ISummary } from '@/types/user.types'

import { useConvertUTCTime } from '@/composables/useConvertUTCTime'

import BaseChart, { type VALUE_DAY } from '../components/BaseChart.vue'
import BaseSummary from '../components/BaseSummary.vue'

onMounted(() => {
  initChart()
  getDataReport()
})
const daysActive = ref<VALUE_DAY>('7_DAYS')
const isLoading = ref<boolean>(false)
const isLoadingChart = ref<boolean>(false)
const valueSummary = ref<IReport>({
  totalDepartment: 0,
  totalDoctor: 0,
  totalPatient: 0,
  totalSchedule: 0,
  totalSpecialize: 0
})
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
const handleFilter = (data: VALUE_DAY) => {
  daysActive.value = data
  initChart()
}

const getDayStartAndEnd = () => {
  const now = new Date()
  const endDate = useConvertUTCTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) as any, 'TO')
  const dayDiff = daysActive.value.split('_')[0]
  const startDate = useConvertUTCTime(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - Number(dayDiff), 0, 0, 0, 0) as any,
    'FROM'
  )
  params.value.fromDate = startDate
  params.value.toDate = endDate
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

<style scoped></style>
