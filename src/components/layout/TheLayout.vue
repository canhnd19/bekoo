<template>
  <ElScrollbar always>
    <template v-if="loading">
      <PageLoading />
    </template>
    <template v-else>
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
import TheFooter from './TheFooter.vue'
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
