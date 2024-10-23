<template>
  <div class="mt-3 flex justify-end">
    <BaseButton size="small" class="w-40" @click="setOpenPopup('popup-add-exmination-package')"
      >Thêm gói khám</BaseButton
    >
  </div>
  <PopupAddExminationPackage :is-loading="isLoading" @add="handleAdd" @cancel="handleCancel" />
</template>

<script setup lang="ts">
import { apiSpecialize } from '@/services'

import { useBaseStore } from '@/stores/base'

import PopupAddExminationPackage from './PopupAddExminationPackage.vue'

const { setOpenPopup } = useBaseStore()

interface IProps {
  departmentId: string
}

const isLoading = ref<boolean>(false)
const props = withDefaults(defineProps<IProps>(), {
  departmentId: ''
})

const handleCancel = () => {
  setOpenPopup('popup-add-exmination-package', false)
}
const handleAdd = async (data: Record<string, any>) => {
  try {
    isLoading.value = true
    const departmentId = props.departmentId
    const rs = await apiSpecialize.createSpecialize({ ...data, departmentId })
    ElMessage.success(rs.message)
    setOpenPopup('popup-add-exmination-package', false)
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}
</script>

<style scoped lang="scss"></style>
