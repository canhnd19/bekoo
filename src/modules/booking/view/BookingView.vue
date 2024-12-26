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
                    <p class="text-xl font-bold text-[#ffb54a]">Giá: {{ useFormatCurrency(item.price) }}</p>
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
              label="gói khám"
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
            <ElCalendar ref="calendar" v-model="day" class="calender" @update:model-value="getDoctorAppointmentTime">
              <template #header="{ date }">
                <BaseIcon name="arrow-left" class="cursor-pointer" @click="selectDate('prev-month')" />
                <p class="w-full text-center">{{ date }}</p>
                <BaseIcon name="arrow-right2" class="cursor-pointer" @click="selectDate('next-month')" />
              </template>
            </ElCalendar>
            <template v-if="timeMorning.length || timeAfternoon.length">
              <div class="mb-4">
                <p class="mb-3 text-xl font-semibold">Buổi sáng</p>
                <div class="flex justify-around">
                  <ul v-for="(item, index) in timeMorning" :key="index">
                    <li
                      :class="[{ active: hour === item.timeCheckIn }, item.available ? 'hour' : 'hour-disabled']"
                      @click="selectedHour(item.timeCheckIn)"
                    >
                      {{ item.range }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mb-8">
                <p class="mb-3 text-xl font-semibold">Buổi chiều</p>
                <div class="flex justify-around">
                  <ul v-for="(item, index) in timeAfternoon" :key="index">
                    <li
                      :class="[{ active: hour === item.timeCheckIn }, item.available ? 'hour' : 'hour-disabled']"
                      @click="selectedHour(item.timeCheckIn)"
                    >
                      {{ item.range }}
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <p class="text-lg text-[#d98634]">Tất cả thời gian theo múi giờ Việt Nam GMT +7</p>
            <div class="mb-4 mt-8">
              <p class="mb-3 text-xl font-semibold">Chọn phương thức thanh toán</p>
              <ElRadioGroup v-model="bookingRequest.paymentMethod" class="payment">
                <ElRadio value="1" size="large" class="text-base">Thanh toán khi tới khám</ElRadio>
                <ElRadio value="2" size="large" class="text-base">Thanh toán bằng thẻ tín dụng</ElRadio>
              </ElRadioGroup>
            </div>
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

import type { IBookingRequest } from '@/types/booking.types'
import type { IPackage } from '@/types/package.types'
import type { IQuery } from '@/types/query.type'

import useDateFormat from '@/composables/useDateFormat'
import useFormatCurrency from '@/composables/useFormatCurrency'

import { useAuthStore } from '@/stores/auth'
import { useBaseStore } from '@/stores/base'

import PopupConfirmBooking from '../components/PopupConfirmBooking.vue'

const { setOpenPopup } = useBaseStore()
const { patient } = useAuthStore()

const route = useRoute()
onMounted(() => {
  Promise.all([getListPackage()])
})

const timeMorning = ref<{ range: string; timeCheckIn: string; available: boolean }[]>([])
const timeAfternoon = ref<{ range: string; timeCheckIn: string; available: boolean }[]>([])
const nameDepartment = sessionStorage.getItem('department-name') as string
const calendar = ref<CalendarInstance>()
const day = ref(new Date())
const hour = ref<string>('')
const dataPackage = ref<IPackage[]>([])
const packageChoose = ref<IPackage>({} as IPackage)
const isChooseDay = ref<boolean>(false)
const query = ref<IQuery>({
  ...DEFAULT_QUERY_PAGINATION
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
    const id = route.params.idDepartment as string
    const rs = await apiSpecialize.getListByDeparmentId(query.value, id)
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
  hour.value = ''
  bookingRequest.value = {
    patientId: '',
    doctorId: '',
    specializeId: '',
    checkIn: '',
    note: '',
    paymentMethod: ''
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
    const doctorId = route.params.idDoctor as string

    const rs = await apiDoctor.getDoctorById(doctorId)
    bookingInfo.value = {
      doctorName: rs.value.info.name,
      packageName: packageChoose.value.name,
      price: packageChoose.value.price,
      time: useDateFormat(hour.value, 'DD/MM/YYYY HH:mm:ss')
    }
    bookingRequest.value = {
      ...bookingRequest.value,
      patientId: patient.id,
      doctorId: route.params.idDoctor as string,
      specializeId: packageChoose.value.id,
      checkIn: hour.value
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
  if (!patient.id) {
    router.push({ name: 'EditUser' })
    ElMessage.warning('Vui lòng cập nhật Thông tin bệnh nhân')
    return
  }
  try {
    isLoadingBooking.value = true
    const rs = await apiBooking.booking(bookingRequest.value)
    ElMessage.success(rs.message)
    setOpenPopup('popup-confirm-booking', false)
    if (rs.value) window.open(rs.value, '_self', 'noopener,noreferrer') /*'_blank',*/
    router.push({ name: 'Home' })
    isLoadingBooking.value = false
  } catch (error) {
    isLoadingBooking.value = false
    console.log(error)
  }
}

const disabled = computed(() => {
  return !hour.value
})

const getDoctorAppointmentTime = async () => {
  try {
    const doctorId = route.params.idDoctor as string
    const date = new Date(day.value)
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` // Định dạng lại ngày
    ElMessage.success(`Bạn chọn ngày đặt khám là ${formattedDate}`)
    const rs = await apiBooking.getDoctorAppointmentTime({
      date: formattedDate,
      doctorId
    })
    timeMorning.value = rs.value.morning
    timeAfternoon.value = rs.value.afternoon
  } catch (error) {
    console.log(error)
  }
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
  border: 1px solid #00e0ff;
  font-size: 20px;
  font-weight: 500;
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
.hour-disabled {
  color: #a8abb2;
  text-align: center;
  margin-right: 16px;
  border: 1px solid var(--border-table);
  font-size: 20px;
  font-weight: 500;
  width: 151px;
  height: auto;
  padding: 12px 2px;
  border-radius: 8px;
  cursor: default;
  pointer-events: none;
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
.payment {
  :deep(.el-radio) {
    .el-radio__input {
      .el-radio__inner {
        width: 20px;
        height: 20px;
      }
    }
    .el-radio__label {
      font-size: 18px;
    }
  }
}

@keyframes styles_animation__RBREz {
  100% {
    transform: rotate(360deg);
  }
}
</style>
