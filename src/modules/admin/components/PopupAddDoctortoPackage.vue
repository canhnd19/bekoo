<template>
  <BasePopup name="popup-add-doctor-to-package" width="600">
    <template #title> Thêm bác sĩ </template>
    <div>
      <BaseInput v-model="query.name" class="input-search mb-3" :show-icon="true" @change="getAllDoctor" />
      <BaseLoading v-if="isLoading" />
      <BaseEmpty v-else-if="data.length === 0" />
      <div v-for="(item, index) in data" v-else :key="index">
        <ElCheckbox
          v-model="idChecked"
          class="check-box"
          :true-value="item.id"
          size="large"
          @change="handleChange(item)"
        >
          <p class="text-xl">{{ item.info.name }} - {{ item.info.email }}</p>
        </ElCheckbox>
      </div>
      <BasePagination
        v-model:page-index="query.pageIndex"
        v-model:page-size="query.pageSize"
        :query="query"
        class="fix-pagination mt-4"
        @limit-change="handleLimitChange"
        @page-change="handlePageChange"
      />
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
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import { apiDoctor } from '@/services'

import type { IDoctor, QueryDoctor } from '@/types/doctor.types'

interface IProps {
  isLoadingAdd: boolean
}
const emits = defineEmits<{
  cancel: []
  add: [value: string]
}>()

const data = ref<IDoctor[]>([])
const isLoading = ref<boolean>(false)
const idChecked = ref<string>('')
const props = withDefaults(defineProps<IProps>(), {
  isLoadingAdd: false
})
const query = ref<QueryDoctor>({
  ...DEFAULT_QUERY_PAGINATION,
  name: ''
})
onMounted(() => {
  getAllDoctor()
})
const getAllDoctor = async () => {
  try {
    isLoading.value = true
    const rs = await apiDoctor.getAllDoctor(query.value)
    data.value = rs.value.contentResponse
    query.value.totalElements = rs.value.totalElements
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}
const handleChange = (data: IDoctor) => {
  idChecked.value = data.id
}
const handleLimitChange = (limit: unknown) => {
  query.value.pageSize = limit as number
  query.value.pageIndex = 1
  getAllDoctor()
}

const handlePageChange = (page: unknown) => {
  query.value.pageIndex = page as number
  getAllDoctor()
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
:deep(.fix-pagination.base-pagination) > div:first-of-type {
  display: none;
}
:deep(.fix-pagination.base-pagination) {
  .list-paging {
    width: 100%;
    display: flex;
    justify-content: end;
  }
}
</style>
