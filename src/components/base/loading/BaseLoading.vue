<template>
  <div class="flex min-h-[202px] flex-col items-center justify-center">
    <div class="loader"></div>
    <div class="mt-3">loading...</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  --_c: no-repeat radial-gradient(farthest-side, #c8c8c8 92%, #0000);
  background:
    var(--_c) top,
    var(--_c) left,
    var(--_c) right,
    var(--_c) bottom;
  background-size: 10px 10px;
  animation: l7 0.7s infinite;
}
@keyframes l7 {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
