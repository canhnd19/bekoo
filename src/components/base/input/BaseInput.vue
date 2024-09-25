<template>
  <div class="base-input">
    <ElInput
      v-model="model"
      v-bind="_props"
      @update:model-value="debounceChange"
      @blur="emit('blur', $event)"
      @focus="emit('focus')"
    >
      <template v-if="showIcon" #prefix>
        <slot name="prefix">
          <BaseIcon name="search" />
        </slot>
      </template>
    </ElInput>
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es'

type TypeInput = 'text' | 'textarea' | 'password'
interface IProps {
  type?: TypeInput
  maxlength?: number | string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  showPassword?: boolean
  autofocus?: boolean
  showWordLimit?: boolean
  showIcon?: boolean
  formatter?: (value: string | number) => string
  parser?: (value: string) => string
}

const _props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  maxlength: '',
  placeholder: 'Search',
  disabled: false,
  readonly: false,
  clearable: false,
  showPassword: false,
  autofocus: false,
  showWordLimit: false,
  showIcon: false,
  formatter: (value: string | number) => value.toString(),
  parser: (value: string) => value
})

const emit = defineEmits<{
  blur: [e: FocusEvent]
  focus: []
  change: [value: string | number]
}>()

const model = defineModel<string | number>({
  required: true,
  default: 'aaa'
})

const debounceChange = debounce((value: string | number) => {
  emit('change', value)
}, 400)
</script>

<style scoped lang="scss">
.base-input {
  :deep(.el-input) {
    font-size: 16px;
    // &:hover {
    //   .el-input__wrapper {
    //     border-color: var(--active);
    //   }
    // }
    .el-input__wrapper {
      background-color: white !important;
      box-shadow: 4px 8px 30px 0 rgba(177, 196, 218, 0.35);
      border-radius: 12px;
      padding-top: 0;
      padding-bottom: 0;
      background-color: transparent;
      .el-input__inner {
        height: 52px;
        // color: var(--primary);
      }
    }
  }
}
</style>
