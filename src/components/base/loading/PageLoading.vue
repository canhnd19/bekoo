<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loader {
  width: 100px;
  aspect-ratio: 1;
  display: grid;
}
.loader::before,
.loader::after {
  content: '';
  grid-area: 1/1;
  --c: no-repeat radial-gradient(farthest-side, #25b09b 92%, #0000);
  background:
    var(--c) 50% 0,
    var(--c) 50% 100%,
    var(--c) 100% 50%,
    var(--c) 0 50%;
  background-size: 20px 20px;
  animation: l12 1s infinite;
}
.loader::before {
  margin: 4px;
  filter: hue-rotate(45deg);
  background-size: 15px 15px;
  animation-timing-function: linear;
}

@keyframes l12 {
  100% {
    transform: rotate(0.5turn);
  }
}
</style>
