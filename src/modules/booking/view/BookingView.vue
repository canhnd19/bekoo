<template>
  <div class="container mt-4">
    <div class="mb-10">
      <p class="my-5 flex items-center justify-start space-x-2">
        <span class="cursor-pointer text-base font-semibold" @click="handleClickHome">Trang chủ</span>
        <BaseIcon name="arrow-right" />
        <span
          class="cursor-pointer font-semibold"
          :class="{ 'text-primary': !isChooseDay }"
          @click="handleClickChoosePackage"
          >Chọn gói khám</span
        >
        <template v-if="isChooseDay">
          <BaseIcon name="arrow-right" />
          <span class="font-semibold text-primary">Chọn ngày khám</span>
        </template>
      </p>
    </div>
  </div>
  <div class="bg-[#e8f2f7] py-10">
    <div class="container">
      <template v-if="!isChooseDay">
        <template v-if="query.loading">
          <BaseLoading />
        </template>
        <div v-else class="box-package">
          <div class="header">
            <p class="text-center text-2xl font-semibold">Vui lòng chọn gói khám</p>
          </div>
          <template v-if="!dataPackage.length">
            <BaseEmpty />
          </template>
          <template v-else>
            <div v-for="(item, index) in dataPackage" :key="index" class="flex items-center justify-center">
              <div class="card-item" @click="choosePackage(item)">
                <img src="/images/bac_si_gia_dinh.png" alt="" />
                <div class="ml-3 w-full">
                  <p class="text-2xl font-medium">{{ item.name }}</p>
                  <div class="flex items-center justify-between">
                    <p class="text-xl font-bold text-[#ffb54a]">Giá: {{ item.price }}đ</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
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
      </template>
      <template v-else>
        <div class="box-package">
          <div class="header">
            <p class="text-center text-2xl font-semibold">Vui lòng chọn thời gian khám</p>
          </div>
          <div class="m-[26px]">
            <ElCalendar ref="calendar" v-model="day" class="calender">
              <template #header="{ date }">
                <BaseIcon name="arrow-left" class="cursor-pointer" @click="selectDate('prev-month')" />
                <p class="w-full text-center">{{ date }}</p>
                <BaseIcon name="arrow-right2" class="cursor-pointer" @click="selectDate('next-month')" />
              </template>
            </ElCalendar>
            <div class="mb-4">
              <p class="mb-3 text-xl font-semibold">Buổi sáng</p>
              <ul class="flex justify-around">
                <li class="hour" :class="{ active: hour === '07:00:00' }" @click="selectedHour('07:00:00')">
                  07:00 - 08:00
                </li>
                <li class="hour" :class="{ active: hour === '08:00:00' }" @click="selectedHour('08:00:00')">
                  08:00 - 09:00
                </li>
                <li class="hour" :class="{ active: hour === '09:00:00' }" @click="selectedHour('09:00:00')">
                  09:00 - 10:00
                </li>
                <li class="hour" :class="{ active: hour === '10:00:00' }" @click="selectedHour('10:00:00')">
                  10:00 - 11:00
                </li>
              </ul>
            </div>
            <div class="mb-8">
              <p class="mb-3 text-xl font-semibold">Buổi chiều</p>
              <ul class="flex justify-around">
                <li class="hour" :class="{ active: hour === '13:00:00' }" @click="selectedHour('13:00:00')">
                  13:00 - 14:00
                </li>
                <li class="hour" :class="{ active: hour === '14:00:00' }" @click="selectedHour('14:00:00')">
                  14:00 - 15:00
                </li>
                <li class="hour" :class="{ active: hour === '15:00:00' }" @click="selectedHour('15:00:00')">
                  15:00 - 16:00
                </li>
                <li class="hour" :class="{ active: hour === '16:00:00' }" @click="selectedHour('16:00:00')">
                  16:00 - 17:00
                </li>
              </ul>
            </div>
            <p class="text-lg text-[#d98634]">Tất cả thời gian theo múi giờ Việt Nam GMT +7</p>
            <div class="mt-8">
              <p class="mb-3 text-xl">Ghi chú</p>
              <ElInput
                v-model="bookingRequest.note"
                class="input"
                style="height: 50px; width: 100%"
                :autosize="{ minRows: 2 }"
                type="textarea"
                placeholder="Vui lòng nhập ghi chú"
              />
            </div>
            <BaseButton
              :loading="isLoadingBtn"
              :disabled="disabled"
              size="small"
              class="mt-8"
              @click="handleClickContinue"
              >Tiếp tục</BaseButton
            >
          </div>
        </div>
      </template>
    </div>
  </div>
  <PopupConfirmBooking
    :is-loading-booking="isLoadingBooking"
    :data="bookingRequest"
    :name-department="nameDepartment"
    :booking-info="bookingInfo"
    @booking="handleBooking"
    @cancel="handleCencalBooking"
  />
</template>

<script setup lang="ts">
import { DEFAULT_QUERY_PAGINATION } from '@/constants'
import router from '@/router'
import { apiBooking, apiDoctor, apiSpecialize } from '@/services'
import type { CalendarDateType, CalendarInstance } from 'element-plus'
import { ref } from 'vue'

import type { IBookingQuery, IBookingRequest } from '@/types/booking.types'
import type { IPackage } from '@/types/package.types'

import { useAuthStore } from '@/stores/auth'
import { useBaseStore } from '@/stores/base'

import PopupConfirmBooking from '../components/PopupConfirmBooking.vue'

const { setOpenPopup } = useBaseStore()
const { user } = useAuthStore()
const route = useRoute()
onMounted(() => {
  getListPackage()
})
const nameDepartment = sessionStorage.getItem('department-name') as string
const calendar = ref<CalendarInstance>()
const day = ref(new Date())
const hour = ref<string>('')
const dataPackage = ref<IPackage[]>([])
const packageChoose = ref<IPackage>({} as IPackage)
const isChooseDay = ref<boolean>(false)
const query = ref<IBookingQuery>({
  ...DEFAULT_QUERY_PAGINATION,
  name: ''
})
const isLoadingBooking = ref<boolean>(false)
const isLoadingBtn = ref<boolean>(false)
const bookingRequest = ref<IBookingRequest>({} as IBookingRequest)
const bookingInfo = ref<Record<string, any>>({
  doctorName: '',
  packageName: '',
  price: ''
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

const handleClickChoosePackage = () => {
  isChooseDay.value = false
  day.value = new Date()
  hour.value = ''
  bookingRequest.value = {
    userId: '',
    doctorId: '',
    specializeId: '',
    checkIn: '',
    note: ''
  }
}
const choosePackage = (data: IPackage) => {
  isChooseDay.value = true
  packageChoose.value = data
}
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}
const selectedHour = (value: string) => {
  hour.value = value
}
const handleClickContinue = async () => {
  try {
    isLoadingBtn.value = true
    const doctorId = route.params.id as string
    const date = `${day.value.toISOString().split('T')[0]} ${hour.value}`
    const conver = new Date(date).toISOString()
    const dateConvert = conver.substring(0, conver.length - 1)
    const rs = await apiDoctor.getDoctorById(doctorId)
    bookingInfo.value = {
      doctorName: rs.value.info.name,
      packageName: packageChoose.value.name,
      price: packageChoose.value.price,
      time: date
    }
    bookingRequest.value = {
      ...bookingRequest.value,
      userId: user.id,
      doctorId: route.params.id as string,
      specializeId: packageChoose.value.id,
      checkIn: dateConvert
    }
    isLoadingBtn.value = false
    setOpenPopup('popup-confirm-booking')
  } catch (error) {
    isLoadingBtn.value = false
    console.log(error)
  }
}
const handleCencalBooking = () => {
  setOpenPopup('popup-confirm-booking', false)
}

const handleBooking = async () => {
  try {
    isLoadingBooking.value = true
    const rs = await apiBooking.booking(bookingRequest.value)
    ElMessage.success(rs.message)
    setOpenPopup('popup-confirm-booking', false)
    isLoadingBooking.value = false
  } catch (error) {
    isLoadingBooking.value = false
    console.log(error)
  }
}

const disabled = computed(() => {
  return !hour.value
})
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

.card-item {
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 0 26px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  width: 900px;
  min-height: 130px;
  margin-bottom: 26px;
  background: #fff;
  border: 2px solid transparent;
  transition: all 0.23s ease;
  overflow: hidden;
  cursor: pointer;
  border-radius: 12px;
  transform: translateY(50px);
  animation: styles_animation__RBREz 0.7s ease 0.3s forwards;
  &:hover {
    box-shadow: 0 0 5px #1da1f2;
  }
}
.hour {
  text-align: center;
  margin-right: 16px;
  line-height: 1;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid #00e0ff;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 151px;
  height: auto;
  padding: 12px 2px;
  border-radius: 8px;
  &:hover {
    background: linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%);
    color: #fff !important;
    cursor: pointer;
  }
}
.hour.active {
  background: linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%);
  color: #fff !important;
}
:deep(.calender.el-calendar) {
  .el-calendar__header {
    .el-calendar__button-group {
      .el-button-group {
        .el-button {
          padding: 10px 20px;
        }
      }
    }
  }
  .el-calendar__body {
    .el-calendar-table {
      .el-calendar-table__row {
        .el-calendar-day {
          span {
            font-size: 20px;
          }
        }
      }
    }
  }
}
:deep(.input.el-textarea) {
  .el-textarea__inner {
    font-size: 16px;
    border-radius: 8px;
  }
}
@keyframes styles_animation__RBREz {
  100% {
    transform: rotate(360deg);
  }
}
</style>
