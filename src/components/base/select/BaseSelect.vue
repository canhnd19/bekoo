<template>
  <div
    class="base-select"
    :class="{
      'select-prefix': props.showPrefix,
      'hidden-suffix': props.hiddenSuffix,
      'hidden-border': props.hiddenBorder
    }"
  >
    <ElSelect
      v-model="model"
      :placeholder="props.placeholder"
      :popper-class="`popper-base-select ${props.popperClass}`"
      :clearable="clearable"
      :disabled="props.disabled"
      :teleported="props.teleported"
      :suffix-icon="IconArrow"
      :filterable="props.filterable"
      :remote="props.remote"
      :remote-method="remoteMethod"
      :filter-method="filterMethod"
      :reserve-keyword="reserveKeyword"
      :multiple="props.multiple"
      :multiple-limit="props.multipleLimit"
      @change="handleChange"
      @blur="emit('blur', $event)"
      @focus="emit('focus')"
      @clear="emit('clear')"
    >
      <slot></slot>
    </ElSelect>
    <div v-if="props.showPrefix" class="prefix">
      <base-icon :name="props.nameIcon || 'search'" size="20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconArrow from '@/icons/arrow.svg?component'

import { type ISelect } from '@/types/component.types'

interface IProps extends ISelect {
  placeholder: string
  popperClass?: string
  teleported?: boolean
  multipleLimit?: number
  nameIcon?: string
  hiddenSuffix?: boolean
  hiddenBorder?: boolean
}
const model = defineModel<any>({
  required: false,
  default: ''
})
const props = withDefaults(defineProps<IProps>(), {
  placeholder: 'Select',
  clearable: false,
  popperClass: '',
  teleported: false,
  remote: false,
  nameIcon: '',
  filterable: false,
  multiple: false,
  reserveKeyword: false,
  showPrefix: false,
  hiddenSuffix: false,
  hiddenBorder: false,
  multipleLimit: 0,
  remoteMethod: () => '',
  filterMethod: () => ''
})
const emit = defineEmits<{
  'update:modelValue': [value: any]
  blur: [e: FocusEvent]
  focus: []
  change: [value: any]
  clear: []
}>()

const handleChange = (value: any) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped lang="scss">
.base-select {
  :deep(.el-select) {
    width: 100%;
    .el-input {
      &:hover {
        .el-input__wrapper,
        .el-input-group__append {
          border-color: var(--dr-border-hover);
        }
      }
      .el-input__wrapper {
        border: 1px solid var(--dr-border-input);
        box-shadow: none;
        border-radius: 8px;
        padding-top: 0;
        padding-bottom: 0;
        .el-input__inner {
          height: 38px;
        }
      }

      .el-input__wrapper.is-focus,
      .el-input__wrapper.is-focus + .el-input-group__append {
        border-color: var(--dr-border-hover);
        box-shadow: none !important;
      }
    }

    .el-input.is-focus {
      .el-input__wrapper {
        box-shadow: none !important;
      }
    }
    .el-input__suffix {
      i {
        font-size: 20px;
        color: #667085;
      }
    }
  }
}
.select-prefix {
  position: relative;
  :deep(.el-select) {
    .el-input {
      .el-input__wrapper {
        .el-input__inner {
          padding-left: 30px;
        }
      }
    }
  }
  .prefix {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    // left: 12px;
  }
}

.hidden-suffix {
  :deep(.el-select) {
    .el-input__suffix {
      display: none !important;
    }
  }
}

.hidden-border {
  :deep(.el-select) {
    .el-input__wrapper {
      border: none !important;
      .el-input__inner::placeholder {
        color: #0a0b0d;
      }
    }
  }
}
</style>
