<template>
  <div class="mx-auto w-full max-w-2xl p-4">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import { onMounted, ref } from 'vue'

const chartRef = ref(null)
interface IProps {
  datasets: { range: string; value: number }[]
  isLoading: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  datasets: () => [],

  isLoading: false
})
watch(
  () => props.datasets,
  () => {
    if (props.datasets.length) {
      renderChart()
    }
  }
)

onMounted(() => {
  renderChart
})

const renderChart = () => {
  const ctx = chartRef.value!.getContext('2d')
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: props.datasets.map((item) => item.range),
      datasets: [
        {
          data: props.datasets.map((item) => item.value),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Phân bố độ tuổi'
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label + ' tuổi' || ''
              if (label) {
                label += ': '
              }
              if (context.parsed !== null) {
                label += context.parsed + ' người'
              }
              return label
            }
          }
        }
      }
    }
  })
}
</script>
