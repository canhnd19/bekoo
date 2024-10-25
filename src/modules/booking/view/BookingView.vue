<template>
  <div class="container mt-4">
    <div class="mb-10">
      <p class="my-5 flex items-center justify-start space-x-2">
        <span class="cursor-pointer text-base font-semibold" @click="handleClickHome">Trang chủ</span>
        <BaseIcon name="arrow-right" />
        <span class="font-semibold text-primary">Chọn gói khám</span>
      </p>
    </div>
  </div>
  <div class="bg-[#e8f2f7] py-10">
    <div class="container">
      <div class="box-package">
        <div class="header">
          <p class="text-center text-2xl font-semibold">Vui lòng chọn gói khám</p>
        </div>
        <div v-for="(item, index) in dataPackage" :key="index" class="flex items-center justify-center">
          <div class="card-item">
            <img src="/images/bac_si_gia_dinh.png" alt="" />
            <div class="ml-3 w-full">
              <p class="text-2xl font-medium">{{ item.name }}</p>
              <div class="flex items-center justify-between">
                <p class="text-xl font-bold text-[#ffb54a]">Giá: {{ item.price }}đ</p>
                <div class="tab justify-center">
                  <div class="tab-item active">
                    <p class="text-center text-xl font-medium text-[#11a2f3]">Đặt khám ngay</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mx-[26px] mb-[26px]">
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
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import router from '@/router'
import { apiSpecialize } from '@/services'

import type { IBookingQuery } from '@/types/booking.types'
import type { IPackage } from '@/types/package.types'

onMounted(() => {
  getListPackage()
})

const dataPackage = ref<IPackage[]>([])
const query = ref<IBookingQuery>({
  ...DEFAULT_QUERY_PAGINATION,
  name: ''
})
const handleClickHome = () => {
  router.push({ name: 'Home' })
}
const getListPackage = async () => {
  try {
    query.value.loading = true
    const rs = await apiSpecialize.getListPackage(query.value)
    dataPackage.value = rs.value.contentResponse
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
.box-package {
  margin-left: auto;
  margin-right: auto;
  width: 900px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 30px 0 rgba(116, 157, 206, 0.2);
  margin-bottom: 20px;
  overflow: hidden;

  .header {
    color: #fff;
    background: linear-gradient(36deg, #00b5f1, #00e0ff) !important;
    font-weight: 500;
    line-height: normal;
    padding: 12px 16px;
    margin-bottom: 26px;
  }
}
.tab {
  @apply flex items-center space-x-3 border-solid border-[#e3e3e3];
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
  margin: 0 26px;
  box-shadow: 0 4px 30px rgba(149, 179, 207, 0.2);
  border-radius: 20px;
  width: 900px;
  min-height: 130px;
  margin-bottom: 26px;
  background: #fff;
  border: 2px solid transparent;
  transition: all 0.23s ease;
  overflow: hidden;
}
</style>
