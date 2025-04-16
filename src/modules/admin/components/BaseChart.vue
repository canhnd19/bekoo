<template>
  <div class="w-full">
    <BaseLoading v-if="isLoading" />
    <template v-else-if="datasets.length">
      <canvas id="chart" ref="refChart" height="340" width="966"></canvas>
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

export type VALUE_DAY = '7_DAYS' | '30_DAYS' | '360_DAYS'

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

const refChart = ref<HTMLCanvasElement>()
const chart = ref<Chart>()

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
          x: {
            grid: {
              display: false
            }
          },
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
