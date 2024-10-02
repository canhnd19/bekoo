<template>
  <div class="min-h-screen bg-[#e8f2f7]">
    <div class="container space-y-6 px-20 pb-6">
      <div class="pt-6 text-2xl font-bold">Thông tin cá nhân</div>
      <div class="flex">
        <div class="mr-[120px] space-y-2">
          <div>
            <span class="text-label">Họ và tên (có dấu) </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <ElInput class="input" style="height: 50px; width: 500px" placeholder="VÍ DỤ: NGỌ ĐỨC CẢNH" />
        </div>
        <div class="space-y-2">
          <div>
            <span class="text-label"> Ngày sinh </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <ElDatePicker type="date" placeholder="DD/MM/YYYY" class="date-picker" format="DD/MM/YYYY" />
        </div>
      </div>

      <div class="style-flex">
        <div class="space-y-2">
          <div>
            <span class="text-label">Số điện thoại </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <ElInput class="input" style="height: 50px; width: 500px" placeholder="Vui lòng nhập số điện thoại " />
        </div>
        <div class="space-y-2">
          <div>
            <span class="text-label">Giới tính </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <BaseSelect clearable placeholder="Chọn giới tính" class="select">
            <ElOption v-for="(item, index) in SEX" :key="index" :value="item.value" :label="item.label"> </ElOption>
          </BaseSelect>
        </div>
      </div>

      <div class="style-flex">
        <div class="space-y-2">
          <p class="text-label">Số CCCD/Passport</p>
          <ElInput class="input" style="height: 50px; width: 500px" placeholder="Nhập số CCCD/Passport" />
        </div>
        <div class="space-y-2">
          <p class="text-label">Địa chỉ Email</p>
          <ElInput class="input" style="height: 50px; width: 500px" placeholder="Vui lòng nhập email" />
        </div>
      </div>

      <div class="style-flex">
        <div class="space-y-2">
          <div>
            <span class="text-label">Tỉnh / Thành </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <BaseSelect
            v-model="codeProvince"
            clearable
            placeholder="Chọn tỉnh thành"
            class="select"
            @change="selectPovince"
          >
            <ElOption v-for="(item, index) in province" :key="index" :value="item.code" :label="item.name"> </ElOption>
          </BaseSelect>
        </div>
        <div class="space-y-2">
          <div>
            <span class="text-label">Quận / Huyện </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <BaseSelect
            v-model="codeDistrict"
            clearable
            placeholder="Chọn quận huyện"
            class="select"
            :disabled="checkDistrict"
            @change="selectDistrict"
          >
            <ElOption v-for="(item, index) in districts" :key="index" :value="item.code" :label="item.name"> </ElOption>
          </BaseSelect>
        </div>
      </div>

      <div class="style-flex">
        <div class="space-y-2">
          <div>
            <span class="text-label">Phường / Xã </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <BaseSelect clearable placeholder="Chọn phường xã" class="select" :disabled="checkWard">
            <ElOption v-for="(item, index) in wards" :key="index" :value="item.code" :label="item.name"> </ElOption>
          </BaseSelect>
        </div>
        <div class="space-y-2">
          <div>
            <span class="text-label">Địa chỉ hiện tại </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <ElInput class="input" style="height: 50px; width: 500px" placeholder="Vui lòng nhập địa chỉ hiện tại" />
        </div>
      </div>

      <div class="text-2xl font-bold">Thông tin tài khoản</div>

      <div class="style-flex">
        <div class="space-y-2">
          <div>
            <span class="text-label">Mật khẩu </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <ElInput class="input" style="height: 50px; width: 500px" placeholder="Vui lòng nhập mật khẩu" />
        </div>
        <div class="space-y-2">
          <div>
            <span class="text-label">Xác nhận mật khẩu </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <ElInput class="input" style="height: 50px; width: 500px" placeholder="Vui lòng nhập lại mật khẩu" />
        </div>
      </div>
      <div class="flex justify-end">
        <BaseButton size="large" type="plain" class="w-32">Đăng kí tài khoản</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiParams } from '@/services'

import type { IDistrict, IWard } from '@/types/param.types'

import { useBaseStore } from '@/stores/base'

import { SEX } from '../constants/index'

const { province } = useBaseStore()

// const route = useRoute()

const districts = ref<IDistrict[]>([])
const wards = ref<IWard[]>([])
const codeProvince = ref<number | string>('')
const codeDistrict = ref<number | string>('')
const selectPovince = async () => {
  try {
    const rs = await apiParams.getListDistrict(codeProvince.value)
    districts.value = rs.districts
  } catch (error) {
    console.log(error)
  }
}

const selectDistrict = async () => {
  try {
    const rs = await apiParams.getListWards(codeDistrict.value)
    wards.value = rs.wards
  } catch (error) {
    console.log(error)
  }
}
const checkDistrict = computed(() => {
  return !codeProvince.value
})

const checkWard = computed(() => {
  return !codeDistrict.value
})
</script>

<style scoped lang="scss">
.text-label {
  @apply text-xl font-medium text-[#003553];
}
.style-flex {
  @apply flex items-end justify-between;
}
:deep(.input.el-input) {
  .el-input__wrapper {
    border-radius: 8px;
    .el-input__inner {
      font-size: 16px;
    }
  }
}
.select {
  :deep(.el-select) {
    .el-select__wrapper {
      height: 50px;
      border-radius: 8px;
      width: 500px;
      .el-select__placeholder {
        font-size: 16px;
      }
    }
  }
}

:deep(.date-picker.el-input) {
  height: 50px;
  width: 500px;
  .el-input__wrapper {
    border-radius: 8px;
  }
}
</style>
