<template>
  <div class="w-full">
    <BaseSelect v-model="daysActive" placeholder="" class="select" :clearable="false" @change="handleFilter">
      <ElOption v-for="(item, index) in FILTER_DAYS" :key="index" :label="item.label" :value="item.value" />
    </BaseSelect>
    <BaseLoading v-if="isLoading"></BaseLoading>
    <template v-else-if="datasets.length">
      <canvas id="chart" ref="refChart" height="340" width="966"></canvas>
      <div class="mt-3 flex justify-center gap-4">
        <div v-for="(item, index) in legendChart" :key="index" class="flex items-center space-x-2 text-xs">
          <span class="block h-2 w-[21px]" :style="{ backgroundColor: item.color }"></span>
          <span class="text-[#667085]">{{ item.name }}</span>
        </div>
      </div>
    </template>
    <BaseEmpty v-else :show="true" />
  </div>
</template>

<script setup lang="ts">
import {
  CategoryScale,
  Chart,
  type ChartDataset,
  Filler,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'

import { FILTER_DAYS } from '../constants/index'

export type VALUE_DAY = '7_DAYS' | '30_DAYS'

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

interface IProps {
  label: string[]
  datasets: ChartDataset[]
  isLoading: boolean
  legendChart: Array<Record<string, any>>
}
const props = withDefaults(defineProps<IProps>(), {
  label: () => [],
  datasets: () => [],
  legendChart: () => [],
  isLoading: false
})
const emits = defineEmits<{
  filter: [filterData: VALUE_DAY]
}>()
const daysActive = ref<VALUE_DAY>('7_DAYS')
const refChart = ref<HTMLCanvasElement>()
const chart = ref<Chart>()
const handleFilter = () => {
  emits('filter', daysActive.value)
}
watch(
  () => props.label,
  () => {
    if (props.label.length) {
      renderChart()
    }
  }
)

onMounted(() => {
  renderChart()
})
const renderChart = () => {
  nextTick(() => {
    chart.value = new Chart(refChart.value!, {
      type: 'line',
      data: {
        labels: props.label,
        datasets: props.datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    })
  })
}
</script>

<style scoped lang="scss">
.select {
  :deep(.el-select) {
    margin: 16px 0;
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
