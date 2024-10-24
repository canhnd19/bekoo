<template>
  <div class="container mt-4">
    <div class="mb-10">
      <p class="my-5 flex items-center justify-start space-x-2">
        <span class="cursor-pointer text-base font-semibold" @click="handleClickHome">Trang chủ</span>
        <BaseIcon name="arrow-right" />
        <span class="font-semibold text-primary">Tìm kiếm</span>
      </p>
      <p class="my-2 text-center text-4xl font-bold text-primary">Kết quả tìm kiếm</p>
      <BaseInput v-model="search" class="input-search mb-3" :show-icon="true" />
    </div>
    <div class="tab border-t py-6">
      <div class="tab-item" :class="{ active: tabActive === 'DOCTOR' }" @click="tabActive = 'DOCTOR'">
        <p class="text-center text-xl font-medium text-[#11a2f3]">Bác sĩ</p>
      </div>
      <div class="tab-item" :class="{ active: tabActive === 'DEPARTMENT' }" @click="tabActive = 'DEPARTMENT'">
        <p class="text-center text-xl font-medium text-[#11a2f3]">Gói khám</p>
      </div>
    </div>
  </div>
  <div class="bg-[#e8f2f7] py-10">
    <div class="container">
      <div v-for="(item, index) in data" :key="index" class="flex items-center justify-center">
        <div class="card-item">
          <img src="/images/bac_si_gia_dinh.png" alt="" />
          <div class="ml-3 w-full">
            <p class="text-2xl font-medium">{{ item.name }}</p>
            <div class="flex items-center justify-between">
              <p class="text-xl font-bold text-[#ffb54a]">Giá: {{ item.price }}đ</p>
              <div class="tab">
                <div class="tab-item active">
                  <p class="text-center text-xl font-medium text-[#11a2f3]">Đặt khám ngay</p>
                </div>
                <div class="tab-item">
                  <p class="text-center text-xl font-medium text-[#11a2f3]">Xem chi tiết</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto w-[700px]">
        <BasePagination
          v-model:page-index="query.pageIndex"
          v-model:page-size="query.pageSize"
          :query="query"
          label="package"
          @limit-change="handleLimitChange"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import router from '@/router'
import { apiSpecialize } from '@/services'

import type { IPackage } from '@/types/package.types'
import type { IQuery } from '@/types/query.type'

const route = useRoute()
onMounted(() => {
  tabActive.value === 'DOCTOR' ? getListPackage() : getListPackage()
})
const nameDepartment = sessionStorage.getItem('department-name')
const search = ref<string>(nameDepartment ? nameDepartment : '')
const tabActive = ref<'DOCTOR' | 'DEPARTMENT'>('DOCTOR')
const query = ref<IQuery>({
  ...DEFAULT_QUERY_PAGINATION
})
const data = ref<IPackage[]>([])
console.log('🚀 ~ route:', route.params.id)

const handleClickHome = () => {
  router.push({ name: 'Home' })
}

const getListPackage = async () => {
  try {
    query.value.loading = true
    const rs = await apiSpecialize.getListPackage(query.value)
    data.value = rs.value.contentResponse
    query.value.totalElements = rs.value.totalElements
    query.value.loading = false
  } catch (error) {
    query.value.loading = false
    console.log(error)
  }
}
const handleLimitChange = (limit: unknown) => {
  query.value.pageSize = limit as number
  query.value.pageIndex = 1
  getListPackage()
}

const handlePageChange = (page: unknown) => {
  query.value.pageIndex = page as number
  getListPackage()
}
</script>

<style scoped lang="scss">
.input-search {
  width: 100%;
  text-align: center;
  margin-top: 28px;
  :deep(.el-input) {
    width: 660px;
    height: 52px;
  }
}
.tab {
  @apply flex items-center justify-center space-x-3 border-solid border-[#e3e3e3];
  .active {
    background: linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%);
    p {
      color: #fff;
    }
  }
  .tab-item {
    @apply cursor-pointer rounded-[50px] border border-solid border-transparent bg-[#ebf9fd] px-4 py-[10px] hover:border hover:border-solid hover:border-[#1da1f2];
  }
}
.card-item {
  display: flex;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 30px rgba(149, 179, 207, 0.2);
  border-radius: 20px;
  width: 700px;
  min-height: 130px;
  margin-bottom: 26px;
  background: #fff;
  border: 2px solid transparent;
  transition: all 0.23s ease;
  overflow: hidden;
}
</style>
