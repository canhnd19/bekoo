<template>
  <BasePopup name="popup-add-doctor-to-package" width="480">
    <template #title> Thêm bác sĩ </template>
    <div>
      <BaseInput v-model="search" class="input-search mb-3" :show-icon="true" @change="handleSearch" />
      <BaseLoading v-if="isLoading" />
      <BaseEmpty v-else-if="data.length === 0" />
      <div v-for="(item, index) in data" v-else :key="index">
        <ElCheckbox
          v-model="idChecked"
          class="check-box"
          :label="item.info.name"
          :true-value="item.id"
          size="large"
          @change="handleChange(item)"
        />
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20" @click="emits('cancel')">Hủy</BaseButton>
        <BaseButton :loading="props.isLoadingAdd" size="small" class="w-20" @click="emits('add', idChecked)"
          >Thêm</BaseButton
        >
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import { apiDoctor } from '@/services'

import type { IDoctor } from '@/types/doctor.types'

interface IProps {
  isLoadingAdd: boolean
}
const emits = defineEmits<{
  cancel: []
  add: [value: string]
}>()

const data = ref<IDoctor[]>([])
const search = ref<string>('')
const isLoading = ref<boolean>(false)
const idChecked = ref<string>('')
const props = withDefaults(defineProps<IProps>(), {
  isLoadingAdd: false
})

const handleSearch = async () => {
  try {
    isLoading.value = true
    const rs = await apiDoctor.getDoctorByName(search.value.trim())
    data.value = rs.value.contentResponse
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}
const handleChange = (data: IDoctor) => {
  idChecked.value = data.id
}
</script>

<style scoped lang="scss">
.input-search {
  width: 100%;
  text-align: left;
  :deep(.el-input) {
    height: 40px;
  }
}
:deep(.check-box.el-checkbox) {
  .el-checkbox__label {
    font-size: 20px;
  }

  .el-checkbox__input.is-checked {
    .el-checkbox__inner {
      border-color: var(--dr-color-primary);
    }
  }

  .el-checkbox__inner {
    width: 20px;
    height: 20px;
    border-radius: 5px;
    background-color: white;
    &::after {
      border-color: var(--dr-color-primary);
      top: 3px;
      left: 6px;
      width: 5px;
      height: 8px;
    }
  }
}
</style>
