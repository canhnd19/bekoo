<template>
  <ElDropdownItem :command="command">
    <div class="grid w-full grid-cols-[1fr_20px] items-center gap-2">
      <div :class="{ 'text-active': exact }" class="line-clamp-1">
        <slot />
      </div>
      <BaseIcon v-if="exact" name="tick" size="14" class="text-active" />
    </div>
  </ElDropdownItem>
</template>

<script setup lang="ts">
interface IProps {
  command: string | number
  exact?: boolean
}
const _props = withDefaults(defineProps<IProps>(), {
  command: '',
  exact: false
})
</script>

<style scoped></style>
