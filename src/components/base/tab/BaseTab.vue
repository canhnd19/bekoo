<template>
  <div class="base-tab">
    <ElScrollbar>
      <div class="flex">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab cursor-pointer font-medium sm:relative sm:!mr-1 sm:px-4 sm:!text-sm"
          :class="[tab.tabValue === model ? 'active' : null, props.isFullWidth && '!w-full']"
          @click="handleSelectTab(tab)"
        >
          {{ tab.title }}
        </div>
      </div>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts">
import type { ITab } from '@/types/component.types'

interface IProp {
  tabs: ITab[]
  isFullWidth?: boolean
}

const props = withDefaults(defineProps<IProp>(), {
  tabs: () => [],
  border: false,
  isFullWidth: false
})

const model = defineModel<string | number>({
  required: true,
  default: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [tab: ITab]
}>()

const handleSelectTab = (tab: ITab) => {
  emit('update:modelValue', tab.tabValue)
  emit('change', tab)
}
</script>

<style scoped lang="scss">
.base-tab {
  border-bottom: 1px solid #31353e;
  .tab {
    color: var(--secondary);
    padding: 0 18px 20px;
    font-size: 16px;
    &:hover {
      color: var(--active);
    }
  }
  .active {
    color: var(--active);
    border-bottom: 2px solid var(--active);
    font-weight: 600;
  }
}

@media (max-width: 1023px) {
  .base-tab {
    .tab {
      padding: 0 14px 10px;
    }
  }
}
</style>
