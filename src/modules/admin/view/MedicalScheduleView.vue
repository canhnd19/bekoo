<template>
  <div class="pb-6 pt-4">
    <BaseTab v-model="tabActive" :tabs="tabs" />
    <component :is="component" :doctor-id="doctorId" />
  </div>
</template>

<script setup lang="ts">
import type { ITab } from '@/types/component.types'

import TabAllDays from '../components/TabAllDays.vue'
import TabDay from '../components/TabDay.vue'

const route = useRoute()
const tabActive = ref<string>('day')
const doctorId = route.params.id as string
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
const component = computed(() => {
  return tabActive.value === 'day' ? TabDay : TabAllDays
})
</script>

<style scoped></style>
