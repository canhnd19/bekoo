<template>
  <BasePopup name="popup-add-department" width="700">
    <template #title> Add department </template>
    <div class="space-y-3">
      <div class="space-y-2">
        <p class="text-label">Tên chuyên khoa</p>
        <ElInput
          v-model="department.name"
          class="input"
          style="height: 50px; width: 100%"
          placeholder="Khoa Răng-Hàm-Mặt"
        />
      </div>
      <div class="space-y-2">
        <p class="text-label">Mô tả</p>
        <ElInput
          v-model="department.description"
          class="input"
          style="height: 50px; width: 100%"
          :autosize="{ minRows: 2 }"
          type="textarea"
          placeholder="Vui lòng nhập mô tả"
        />
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20" @click="setOpenPopup('popup-add-department', false)"
          >Hủy</BaseButton
        >
        <BaseButton :loading="isLoading" size="small" class="w-20" @click="handleCreateDepartment">Tạo</BaseButton>
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import { apiDepartment } from '@/services'

import { useBaseStore } from '@/stores/base'

const { setOpenPopup } = useBaseStore()

const isLoading = ref<boolean>(false)
const department = ref<Record<string, any>>({
  name: '',
  description: ''
})

const handleCreateDepartment = async () => {
  try {
    isLoading.value = true
    const rs = await apiDepartment.createdDepartment({ ...department.value })
    ElMessage.success(rs.message)
    setOpenPopup('popup-add-department', false)
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}
</script>

<style scoped lang="scss">
.text-label {
  @apply text-xl font-medium text-[#003553];
}
:deep(.input.el-input) {
  .el-input__wrapper {
    border-radius: 8px;
    .el-input__inner {
      font-size: 16px;
    }
  }
}
:deep(.input.el-textarea) {
  .el-textarea__inner {
    font-size: 16px;
    border-radius: 8px;
  }
}
</style>
