<template>
  <div>
    <div class="flex items-start justify-between">
      <BaseInput v-model="search" class="input-search" :show-icon="true" />
      <BaseButton size="small" class="w-20" @click="setOpenPopup('popup-add-doctor')">Add</BaseButton>
    </div>
  </div>
  <PopupAddDoctor />
</template>

<script setup lang="ts">
import { useBaseStore } from '@/stores/base'

import PopupAddDoctor from '../components/PopupAddDoctor.vue'

const { setOpenPopup } = useBaseStore()

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
