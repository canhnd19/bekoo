<template>
  <div
    class="button"
    :class="[`button--${size}`, `button--${type}`, { 'button--loading': loading, 'button--disabled': disabled }]"
    @click="handleClick"
  >
    <div v-if="loading" class="is-loading">
      <BaseIcon name="loading" />
    </div>
    <div class="title">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es'

import BaseIcon from '../icon/BaseIcon.vue'

type Size = 'large' | 'medium' | 'small'
type Type = 'primary' | 'plain' | 'disabled' | 'linear'

interface IProps {
  size?: Size
  type?: Type
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  size: 'small',
  type: 'primary',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = debounce(() => {
  if (props.loading) {
    return
  }
  emit('click')
}, 300)
</script>

<style scoped lang="scss">
.button {
  @apply flex cursor-pointer select-none items-center justify-center rounded-lg border border-solid bg-transparent;

  .is-loading {
    margin-right: 6px;
  }

  .title {
    font-size: 14px;
    color: #fff;
  }
}

.button {
  &--large {
    height: 50px;
  }

  &--medium {
    height: 44px;
  }

  &--small {
    height: 40px;
  }

  &--primary {
    background-color: #1da1f2;
    border-color: var(--border-button-primary);
    .title {
      color: #fff;
    }
  }

  &--plain {
    background: var(--primary-gradient-title, linear-gradient(40deg, #00b5f1 0, #00e0ff 100%));
  }

  &--disabled {
    cursor: default;
    pointer-events: none;
    border-color: #1da1f2;
    background-color: transparent;
    .title {
      color: var(--disabled);
    }
  }

  &--linear {
    box-shadow: var(--shadow);
    border: none;
    border-radius: 16px;
  }

  &--loading {
    cursor: default;
    pointer-events: none;
    color: var(--primary);

    .is-loading {
      animation: rotating 2s linear infinite;
    }
  }
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
