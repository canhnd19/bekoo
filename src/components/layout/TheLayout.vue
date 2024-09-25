<template>
  <ElScrollbar always>
    <template v-if="loading">
      <PageLoading />
    </template>
    <template v-else>
      <TheHeader />
      <RouterView />
    </template>
  </ElScrollbar>
</template>

<script setup lang="ts">
import TheHeader from './TheHeader.vue'

// const route = useRoute()

const loading = ref(true)

const init = () => {
  try {
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

init()
</script>

<style scoped></style>
