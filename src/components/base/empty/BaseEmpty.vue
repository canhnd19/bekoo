<template>
  <div v-if="show" class="flex h-full flex-col items-center justify-center py-[22px]">
    <BaseIcon name="no-data" size="80" class="text-secondary" />
    <p class="mt-3 text-sm text-secondary">Không có dữ liệu</p>
  </div>
</template>

<script setup lang="ts">
interface IProp {
  show?: boolean
}

const _prop = withDefaults(defineProps<IProp>(), {
  show: true
})
</script>

<style scoped></style>
