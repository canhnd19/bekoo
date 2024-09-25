<template>
  <div class="base-dropdown relative flex items-center" @mouseenter="isHover = true" @mouseleave="isHover = false">
    <ElDropdown
      :placement="placement"
      :trigger="trigger"
      :teleported="teleported"
      :max-height="maxHeight"
      :disabled="disabled"
      class="h-12 w-full"
      :popper-class="`base-popper-dropdown ${popperClass}`"
      @visible-change="handleVisibleChange"
      @command="handleCommand"
    >
      <div class="flex w-full items-center justify-between px-5">
        <div class="mr-2 flex-1 overflow-hidden text-base">
          <slot name="reference"></slot>
        </div>
        <BaseIcon
          v-if="!isShowClearIcon && showArrow"
          name="arrow"
          size="20"
          class="transition-transform"
          :class="{ 'rotate-180': isOpen }"
        />
      </div>

      <template #dropdown>
        <ElDropdownMenu :style="{ width: popperWidth + 'px' }">
          <slot name="menu"></slot>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
    <div class="absolute right-5 z-10">
      <BaseIcon v-if="isShowClearIcon" name="clear" size="20" @click="($event) => handleClear($event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

type Trigger = 'hover' | 'click'
interface IProps {
  placement?: Placement
  trigger?: Trigger
  popperClass?: string
  teleported?: boolean
  maxHeight?: number | string
  disabled?: boolean
  popperWidth?: number | string
  clearable?: boolean
  multiple?: boolean
  showBorder?: boolean
  showArrow?: boolean
}

const _props = withDefaults(defineProps<IProps>(), {
  placement: 'bottom',
  trigger: 'click',
  popperClass: '',
  teleported: true,
  maxHeight: 300,
  disabled: false,
  popperWidth: 200,
  clearable: true,
  multiple: true,
  showBorder: true,
  showArrow: true
})

const emit = defineEmits<{
  command: [any]
}>()

const model = defineModel<any>({
  default: null,
  required: false
})

const isHover = ref(false)
const isOpen = ref(false)
const isConFlickClick = ref(false)

const isShowClearIcon = computed(() => model.value && isHover.value && _props.clearable)

const handleVisibleChange = (visible: boolean) => {
  isOpen.value = visible
}
const handleClear = (event: MouseEvent) => {
  event.preventDefault()
  isConFlickClick.value = true
  model.value = null
  emit('command', '')
}

const handleCommand = (command: any) => {
  if (_props.multiple) {
    model.value = command
  } else {
    model.value = command === model.value ? null : command
  }
  emit('command', command)
}
</script>

<style scoped lang="scss">
.base-dropdown {
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  transition: all 0.4s ease;
}
</style>

<style lang="scss">
.el-popper.base-popper-dropdown {
  border: none;
  border-radius: 8px;
  .el-scrollbar__wrap {
    border-radius: 8px;
    .el-dropdown-menu {
      padding: 0px;
      .el-dropdown-menu__item {
        font-size: 16px;
        color: var(--secondary);
        height: 36px;
        padding-left: 8px;
        padding-right: 0;
        &:hover,
        &:focus {
          color: var(--primary);
          background-color: #e6f2ff;
        }
      }
    }
  }

  .el-popper__arrow {
    display: none;
  }
}
</style>
