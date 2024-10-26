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
    <div class="tab justify-center border-t py-6">
      <div class="tab-item" :class="{ active: tabActive === 'DOCTOR' }" @click="tabActive = 'DOCTOR'">
        <p class="text-center text-xl font-medium text-[#11a2f3]">Bác sĩ</p>
      </div>
      <div class="tab-item" :class="{ active: tabActive === 'DEPARTMENT' }" @click="tabActive = 'DEPARTMENT'">
        <p class="text-center text-xl font-medium text-[#11a2f3]">Gói khám</p>
      </div>
    </div>
  </div>
  <div class="bg-[#e8f2f7] py-10">
    <template v-if="query.loading">
      <BaseLoading />
    </template>
    <div v-else class="container">
      <template v-if="tabActive === 'DEPARTMENT'">
        <template v-if="!dataPackage.length">
          <BaseEmpty />
        </template>
        <template v-else>
          <div v-for="(item, index) in dataPackage" :key="index" class="flex items-center justify-center">
            <div class="card-item">
              <img src="/images/bac_si_gia_dinh.png" alt="" />
              <div class="ml-3 w-full">
                <p class="text-2xl font-medium">{{ item.name }}</p>
                <div class="flex items-center justify-between">
                  <p class="text-xl font-bold text-[#ffb54a]">Giá: {{ item.price }}đ</p>
                  <div class="tab justify-center">
                    <!-- <div class="tab-item active">
                      <p class="text-center text-xl font-medium text-[#11a2f3]">Đặt khám ngay</p>
                    </div> -->
                    <div class="tab-item">
                      <p class="text-center text-xl font-medium text-[#11a2f3]" @click="handleSeeDetail(item)">
                        Xem chi tiết
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <template v-if="!dataDoctors.length">
          <BaseEmpty />
        </template>
        <template v-else>
          <div v-for="(item, index) in dataDoctors" :key="index" class="flex items-center justify-center">
            <div class="doctor-card">
              <div>
                <div v-if="!item.info.linkAvatar" class="image-doctor">
                  <img
                    v-if="item.info.gender === 'Female'"
                    src="/images/avatar-default-doctor-female.png"
                    alt=""
                    class="h-[120px] w-[120px] rounded-xl object-cover"
                  />
                  <img
                    v-else
                    src="/images/avatar-default-doctor-male.png"
                    alt=""
                    class="h-[120px] w-[120px] rounded-xl object-cover"
                  />
                </div>
                <div v-else class="image-doctor">
                  <img :src="item.info.linkAvatar" alt="" class="h-[120px] w-[120px] rounded-xl object-cover" />
                </div>
              </div>
              <div class="w-full">
                <div>
                  <p class="mb-2 text-xl text-[#11a2f3]">
                    <span>TS BS. </span>
                    <strong>{{ item.info.name }} | {{ nameDepartment }} </strong>
                  </p>
                  <p>
                    <strong>Chuyên trị: </strong>
                  </p>
                  <p>
                    <strong>Lịch khám: </strong>
                  </p>
                </div>

                <div class="tab justify-end">
                  <div class="tab-item">
                    <p class="text-center text-xl font-medium text-[#11a2f3]">Xem chi tiết</p>
                  </div>
                  <div class="tab-item active">
                    <p class="text-center text-xl font-medium text-[#11a2f3]" @click="handleBookingNow(item)">
                      Đặt khám ngay
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
      <div class="mx-auto w-[900px]">
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
  <PopupPackageDetail :package-detail="packageDetail" />
  <PopupWarningBooking @close="handleClosePopupWarning" @agree="handleAgreePopupWarning" />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import router from '@/router'
import { apiDepartment, apiSpecialize } from '@/services'

import type { IDoctor } from '@/types/doctor.types'
import type { IPackage } from '@/types/package.types'
import type { IQuery } from '@/types/query.type'

import { useAuthStore } from '@/stores/auth'
import { useBaseStore } from '@/stores/base'

import PopupPackageDetail from '../components/PopupPackageDetail.vue'
import PopupWarningBooking from '../components/PopupWarningChooseDoctor.vue'

const { isLoggedIn } = storeToRefs(useAuthStore())
const { setOpenPopup } = useBaseStore()
const route = useRoute()
onMounted(() => {
  getData()
})
const nameDepartment = sessionStorage.getItem('department-name')
const search = ref<string>(nameDepartment ? nameDepartment : '')
const tabActive = ref<'DOCTOR' | 'DEPARTMENT'>('DOCTOR')
const query = ref<IQuery>({
  ...DEFAULT_QUERY_PAGINATION
})
const dataPackage = ref<IPackage[]>([])
const dataDoctors = ref<IDoctor[]>([])
const packageDetail = ref<IPackage>({} as IPackage)
const idDoctorBooking = ref<string>('')
watch(
  () => tabActive.value,
  () => {
    getData()
  }
)
const handleClickHome = () => {
  router.push({ name: 'Home' })
}
const getData = async () => {
  try {
    query.value.loading = true
    const id = route.params.id as string
    if (tabActive.value === 'DOCTOR') {
      const rs = await apiDepartment.getListDoctorOfDepartment(id)
      dataDoctors.value = rs.value.contentResponse
      query.value.totalElements = rs.value.totalElements
    } else {
      const rs = await apiSpecialize.getListByDeparmentId(query.value, id)
      dataPackage.value = rs.value.contentResponse
      query.value.totalElements = rs.value.totalElements
    }
    query.value.loading = false
  } catch (error) {
    query.value.loading = false
    console.log(error)
  }
}

const handleLimitChange = (limit: unknown) => {
  query.value.pageSize = limit as number
  query.value.pageIndex = 1
  getData()
}

const handlePageChange = (page: unknown) => {
  query.value.pageIndex = page as number
  getData()
}

const handleSeeDetail = (data: IPackage) => {
  packageDetail.value = data
  setOpenPopup('popup-package-detail')
}

const handleBookingNow = (data: IDoctor) => {
  if (!isLoggedIn.value) {
    router.push({ name: 'Login' })
    return
  }
  idDoctorBooking.value = data.id
  setOpenPopup('popup-warning-choose-doctor')
}
const handleClosePopupWarning = () => {
  setOpenPopup('popup-warning-choose-doctor', false)
}

const handleAgreePopupWarning = () => {
  setOpenPopup('popup-warning-choose-doctor', false)
  router.push({ name: 'Booking', params: { id: idDoctorBooking.value } })
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
.doctor-card {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 26px;
  border-radius: 12px;
  width: 900px;
  display: flex;
  border: 1px solid #d7dbe0;
  background: #fff;
  .image-doctor {
    width: 120px;
    height: 120px;
    min-width: 120px;
    position: relative;
    background: #eaeaea;
    border-radius: 12px;
    margin-right: 16px;
  }
}
</style>
