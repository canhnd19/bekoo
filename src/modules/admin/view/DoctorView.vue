<template>
  <div>
    <div class="flex items-start justify-between">
      <BaseInput v-model="search" class="input-search" :show-icon="true" />
      <BaseButton size="small" class="w-20">Add</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const search = ref<string>('')
</script>

<style scoped lang="scss">
.input-search {
  width: 100%;
  text-align: left;
  :deep(.el-input) {
    width: 300px;
    height: 40px;
  }
}
</style>
