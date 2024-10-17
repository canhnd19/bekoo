<template>
  <ElScrollbar always>
    <template v-if="loading">
      <PageLoading />
    </template>
    <template v-else>
      <!-- <template v-if="['Login', 'SignUp', 'ForgotPassword'].includes(route.name as string)">
        <RouterView />
      </template> -->
      <div class="flex h-dvh flex-col justify-between">
        <div>
          <TheHeader />
          <RouterView />
        </div>
        <TheFooter />
      </div>
    </template>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { useBaseStore } from '@/stores/base'

import TheFooter from './TheFooter.vue'
import TheHeader from './TheHeader.vue'

const { getListProvince } = useBaseStore()

// const route = useRoute()

const loading = ref(true)

const init = async () => {
  try {
    const promises = [getListProvince()]
    await Promise.all(promises)
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

init()
</script>

<style scoped></style>
