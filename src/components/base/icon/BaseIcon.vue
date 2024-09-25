<template>
  <div class="base-icon" :style="{ width: size + 'px' }" @click="($event) => emit('click', $event)">
    <component :is="icon"></component>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  name: string
  size?: string | number
}
const props = withDefaults(defineProps<IProps>(), {
  name: '',
  size: 20
})
const emit = defineEmits<{
  click: [e: MouseEvent]
}>()
const iconsImport = import.meta.glob(`@/icons/*.svg`)
const icon = shallowRef<any>()

watchEffect(async () => {
  try {
    const rawIcon = await iconsImport[`/src/icons/${props.name}.svg`]()
    icon.value = rawIcon
  } catch {
    console.error(`[base-icons] Icon '${props.name}' doesn't exist in 'src/icons'`)
  }
})
</script>

<style scoped></style>
