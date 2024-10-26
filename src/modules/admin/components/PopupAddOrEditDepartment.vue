<template>
  <BasePopup name="popup-add-or-edit-department" width="700">
    <template #title>{{ props.typeAction === 'ADD' ? 'Thêm chuyên khoa' : 'Sửa chuyên khoa' }} </template>
    <div class="space-y-3">
      <div class="flex justify-center">
        <div class="relative w-40">
          <img :src="department.urlImage" alt="" class="h-40 w-full rounded-full object-cover" />
          <ElUpload
            :show-file-list="false"
            :auto-upload="false"
            accept=".png, .jpg, .webp, .jpeg"
            :on-change="handleSelectFile"
            class="absolute bottom-4 right-1"
          >
            <div class="border-border-table rounded-full border border-solid bg-white p-2">
              <BaseIcon name="edit-avatar" />
            </div>
          </ElUpload>
        </div>
      </div>
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
        <BaseButton type="plain" size="small" class="w-20" @click="handleCancel">Hủy</BaseButton>
        <BaseButton :loading="isLoading" size="small" class="w-20" @click="handleAddOrEditDepartment">
          {{ props.typeAction === 'ADD' ? 'Tạo' : 'Sửa' }}
        </BaseButton>
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import { apiDepartment } from '@/services'

import type { DepartmentRequest, IDepartment } from '@/types/department.types'

import { useBaseStore } from '@/stores/base'

const { setOpenPopup } = useBaseStore()

interface IProps {
  data: IDepartment
  typeAction: 'ADD' | 'EDIT' | ''
}
const emits = defineEmits<{
  'add-or-edit': []
}>()

const props = withDefaults(defineProps<IProps>(), {
  data: () => ({}) as IDepartment,
  typeAction: ''
})
const file = ref<Record<string, any>>({})
const isLoading = ref<boolean>(false)
const department = ref<DepartmentRequest>({
  name: '',
  description: '',
  urlImage: ''
})

watch(
  () => props.data,
  (newData) => {
    department.value = {
      name: newData.name,
      description: newData.description,
      urlImage: newData.urlImage
    }
  }
)

const handleSelectFile = async (_file: Record<string, any>) => {
  file.value = _file

  department.value.urlImage = URL.createObjectURL(file.value.raw)
}

const handleAddOrEditDepartment = async () => {
  try {
    isLoading.value = true
    const id = props.data.id
    const formData = new FormData()
    if (props.typeAction === 'EDIT') formData.append('id', id)
    if (file.value.raw) formData.append('image', file.value.raw)
    formData.append('name', department.value.name)
    formData.append('description', department.value.description)
    const rs =
      props.typeAction === 'ADD'
        ? await apiDepartment.createdDepartment(formData)
        : await apiDepartment.editDepartment(formData)
    ElMessage.success(rs.message)
    setOpenPopup('popup-add-or-edit-department', false)
    emits('add-or-edit')
    department.value = {
      name: '',
      description: '',
      urlImage: ''
    }
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}
const handleCancel = () => {
  department.value = {
    name: '',
    description: '',
    urlImage: ''
  }
  setOpenPopup('popup-add-or-edit-department', false)
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
