<template>
  <el-drawer
    v-model="isOpen"
    :direction="direction"
    :size="size"
    :append-to-body="appendToBody"
    :with-header="withHeader"
    :modal="modal"
    class="base-drawer !overflow-y-auto"
    @close="emits('close')"
    @open="emits('open')"
  >
    <template #header>
      <div class="flex h-14 w-full items-center justify-between">
        <base-icon name="xmark-large" size="24" class="cursor-pointer" @click="baseStore.setOpenDrawer(name, false)" />
        <span class="text-lg font-semibold">{{ props.title }}</span>
        <span class="cursor-pointer text-base" @click="handleReset">Reset</span>
      </div>
    </template>
    <slot class="overflow-y-auto"></slot>
    <template v-if="showFooter" #footer>
      <div class="px-5">
        <slot name="footer"></slot>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { findIndex } from 'lodash-es'

import type { DRAWER_NAME } from '@/types/popup.types'

import { useBaseStore } from '@/stores/base'

interface IProps {
  name: DRAWER_NAME
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt' | 'rtl'
  size?: number | string
  title?: string
  showFooter?: boolean
  withHeader?: boolean
  modal?: boolean
  appendToBody?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  name: 'drawer-root',
  direction: 'rtl',
  size: '100%',
  title: '',
  showFooter: true,
  withHeader: true,
  modal: true,
  appendToBody: true
})

const emits = defineEmits<{
  open: []
  close: []
  'reset-filter': []
}>()

const baseStore = useBaseStore()
const isOpen = computed({
  // getter
  get() {
    return (
      findIndex(baseStore.drawer, (value) => {
        return value === props.name
      }) !== -1
    )
  },
  // setter
  set(value: boolean) {
    baseStore.setOpenDrawer(props.name, value)
  }
})

const handleReset = () => {
  baseStore.setOpenDrawer(props.name, false)
  emits('reset-filter')
}
</script>

<style lang="scss">
.base-drawer {
  .el-drawer__header {
    color: var(--primary);
    margin-bottom: 0;
    border-bottom: 1px solid #3c424d;
    padding: 0 20px;
    .el-drawer__close-btn {
      display: none;
    }
  }
  .el-drawer__body {
    flex: none;
    flex: 1;
  }
  .el-drawer__footer {
    padding: 0;
    border-top: 1px solid #3c424d;
  }
}
</style>
