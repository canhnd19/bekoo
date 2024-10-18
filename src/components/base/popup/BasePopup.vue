<template>
  <ElDialog
    v-model="isOpen"
    :width="props.width"
    :append-to-body="props.appendBody"
    :close-on-press-escape="props.closePressEscape"
    :close-on-click-modal="props.closeClickModal"
    :top="props.top"
    :destroy-on-close="destroyOnClose"
    align-center
    class="base-popup"
    @open="handleOpen"
    @close="handleClose"
  >
    <template #header>
      <div class="w-full text-lg font-semibold uppercase text-secondary">
        <slot name="title" />
      </div>
    </template>

    <div ref="popupBody" class="popup-content" :style="{ padding: props.padding }">
      <slot />
    </div>
    <template v-if="isShowFooter" #footer>
      <div class="popup-footer">
        <slot name="footer" />
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { findIndex } from 'lodash-es'

import type { POPUP_NAME } from '@/types/popup.types'

import { useBaseStore } from '@/stores/base'

interface IPopup {
  name: POPUP_NAME
  width: string
  appendBody?: boolean
  isShowFooter?: boolean
  top?: string
  closeClickModal?: boolean
  closePressEscape?: boolean
  padding?: string
  destroyOnClose?: boolean
}
const props = withDefaults(defineProps<IPopup>(), {
  name: 'popup-root',
  width: '600px',
  top: '5vh',
  isShowFooter: true,
  appendBody: true,
  closeClickModal: false,
  closePressEscape: true,
  padding: '24px',
  destroyOnClose: false
})

const emits = defineEmits<{
  close: []
  open: []
}>()

const baseStore = useBaseStore()
const popupBody = ref<HTMLElement>()

const isOpen = computed({
  // getter
  get() {
    return (
      findIndex(baseStore.popup, (value) => {
        return value === props.name
      }) !== -1
    )
  },
  // setter
  set(value: boolean) {
    baseStore.setOpenPopup(props.name, value)
  }
})

const handleOpen = () => {
  emits('open')
}
const handleClose = () => {
  emits('close')
}

defineExpose({ popupBody })
</script>

<style scoped>
.popup-content {
  scroll-behavior: smooth;
}
</style>

<style lang="scss">
.base-popup {
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  height: fit-content;
  margin: 0;
  @media screen and (max-width: 768px) {
    width: calc(100% - 20px) !important;
  }

  .el-dialog__header {
    min-height: 68px;
    border-bottom: 1px solid var(--border-table);
    margin-right: 0;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
      min-height: 68px;
    }
    .el-dialog__headerbtn {
      height: 24px;
      width: 24px;
      position: initial;
      i {
        font-size: 24px;
      }
    }
  }
  .el-dialog__body {
    padding: 0;
    overflow-y: auto;
    scroll-behavior: smooth;
    flex: 1;
    color: var(--secondary);
    .popup-content {
      overflow: auto;
      padding-bottom: 0;
      overflow-y: auto;
      overflow-x: hidden;

      @media screen and (max-width: 768px) {
        padding: 20px 24px;
      }
    }
  }
  .el-dialog__footer {
    padding: 0 24px;
    border-top: 1px solid var(--border-table);
    .popup-footer {
      min-height: 64px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
