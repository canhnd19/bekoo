<template>
  <template v-if="loading">
    <PageLoading />
  </template>
  <div v-else class="min-h-screen bg-[#e8f2f7]">
    <div class="container space-y-4 px-20 pb-6">
      <div class="pt-6 text-2xl font-bold">Thông tin cá nhân</div>
      <div class="flex">
        <div class="mr-[120px] space-y-2">
          <div>
            <span class="text-label">Họ và tên (có dấu) </span>
            <span class="text-[#ff3b30]">*</span>
          </div>

          <ElForm ref="formRef" style="max-width: 500px" :model="userSignUp" label-width="auto" class="demo-ruleForm">
            <ElFormItem
              prop="name"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập họ và tên',
                  trigger: 'blur'
                }
              ]"
            >
              <ElInput
                v-model="userSignUp.name"
                class="input"
                style="height: 50px; width: 500px"
                placeholder="VÍ DỤ: NGỌ ĐỨC CẢNH"
              />
            </ElFormItem>
          </ElForm>
        </div>
        <div>
          <div class="mb-2">
            <span class="text-label"> Ngày sinh </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <ElDatePicker
            v-model="userSignUp.dob"
            :class="{ validate: checkDob }"
            type="date"
            placeholder="DD/MM/YYYY"
            class="date-picker"
            format="DD/MM/YYYY"
            @blur="blurDatePicker"
          />
          <p v-if="checkDob" class="-!mt-1 text-xs text-[#f56c6c]">Vui lòng nhập ngày sinh</p>
        </div>
      </div>

      <div class="style-flex">
        <div class="space-y-2">
          <div>
            <span class="text-label">Số điện thoại </span>
            <span class="text-[#ff3b30]">*</span>
          </div>

          <ElForm ref="formRef" style="max-width: 500px" :model="userSignUp" label-width="auto" class="demo-ruleForm">
            <ElFormItem
              prop="phoneNumber"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại',
                  trigger: 'blur'
                }
              ]"
            >
              <ElInput
                v-model="userSignUp.phoneNumber"
                class="input"
                style="height: 50px; width: 500px"
                placeholder="Vui lòng nhập số điện thoại "
              />
            </ElFormItem>
          </ElForm>
        </div>
        <div>
          <div class="mb-2">
            <span class="text-label">Giới tính </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <BaseSelect
            v-model="userSignUp.gender"
            :class="{ 'validate-select': checkGender }"
            clearable
            placeholder="Chọn giới tính"
            class="select"
            @blur="blurSex"
          >
            <ElOption v-for="(item, index) in SEX" :key="index" :value="item.value" :label="item.label"> </ElOption>
          </BaseSelect>
          <p v-if="checkGender" class="-!mt-1 text-xs text-[#f56c6c]">Vui lòng chọn giới tính</p>
        </div>
      </div>

      <div class="style-flex">
        <div class="space-y-2">
          <div>
            <span class="text-label">Số CCCD/Passport </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <ElForm ref="formRef" style="max-width: 500px" :model="userSignUp" label-width="auto" class="demo-ruleForm">
            <ElFormItem
              prop="cccd"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập số CCCD/Passport',
                  trigger: 'blur'
                }
              ]"
            >
              <ElInput
                v-model="userSignUp.cccd"
                class="input"
                style="height: 50px; width: 500px"
                placeholder="Nhập số CCCD/Passport"
              />
            </ElFormItem>
          </ElForm>
        </div>
        <div class="space-y-2">
          <div>
            <span class="text-label">Địa chỉ Email </span>
            <span class="text-[#ff3b30]">*</span>
          </div>

          <ElForm ref="formRef" style="max-width: 500px" :model="userSignUp" label-width="auto" class="demo-ruleForm">
            <ElFormItem
              prop="email"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập địa chỉ email',
                  trigger: 'blur'
                },
                {
                  type: 'email',
                  message: 'Vui lòng nhập địa chỉ email chính xác',
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <ElInput
                v-model="userSignUp.email"
                class="input"
                style="height: 50px; width: 500px"
                placeholder="Vui lòng nhập email"
              />
            </ElFormItem>
          </ElForm>
        </div>
      </div>

      <div class="style-flex h-[102px]">
        <div>
          <div class="mb-2">
            <span class="text-label">Tỉnh / Thành </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <BaseSelect
            v-model="codeProvince"
            :class="{ 'validate-select': checkProvince }"
            clearable
            placeholder="Chọn tỉnh thành"
            class="select"
            @change="getListDistrict"
            @blur="blurProvince"
          >
            <ElOption v-for="(item, index) in province" :key="index" :value="item.code" :label="item.name">
              <p
                @click="
                  () => {
                    userSignUp.province = item.name
                  }
                "
              >
                {{ item.name }}
              </p></ElOption
            >
          </BaseSelect>
          <p v-if="checkProvince" class="-!mt-1 text-xs text-[#f56c6c]">Vui lòng chọn tỉnh/thành</p>
        </div>
        <div>
          <div class="mb-2">
            <span class="text-label">Quận / Huyện </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <BaseSelect
            v-model="codeDistrict"
            :class="{ 'validate-select': checkValDistrict }"
            clearable
            placeholder="Chọn quận huyện"
            class="select"
            :disabled="checkDistrict"
            @change="getListWards"
            @blur="blurDistrict"
          >
            <ElOption v-for="(item, index) in districts" :key="index" :value="item.code" :label="item.name">
              <p
                @click="
                  () => {
                    userSignUp.district = item.name
                  }
                "
              >
                {{ item.name }}
              </p>
            </ElOption>
          </BaseSelect>
          <p v-if="checkValDistrict" class="-!mt-1 text-xs text-[#f56c6c]">Vui lòng chọn quận/huyện</p>
        </div>
      </div>

      <div class="style-flex h-[102px]">
        <div>
          <div class="mb-2">
            <span class="text-label">Phường / Xã </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <BaseSelect
            :class="{ 'validate-select': checkValWard }"
            clearable
            placeholder="Chọn phường xã"
            class="select"
            :disabled="checkWard"
            @blur="blurWard"
          >
            <ElOption v-for="(item, index) in wards" :key="index" :value="item.code" :label="item.name">
              <p
                @click="
                  () => {
                    userSignUp.commune = item.name
                  }
                "
              >
                {{ item.name }}
              </p>
            </ElOption>
          </BaseSelect>
          <p v-if="checkValWard" class="-!mt-1 text-xs text-[#f56c6c]">Vui lòng chọn phường/xã</p>
        </div>
        <div class="space-y-2">
          <p class="text-label">Địa chỉ hiện tại</p>
          <ElInput
            v-model="userSignUp.aboutAddress"
            class="input"
            style="height: 50px; width: 500px"
            placeholder="Vui lòng nhập địa chỉ hiện tại"
          />
        </div>
      </div>

      <div class="text-2xl font-bold">Thông tin tài khoản</div>
      <div class="style-flex">
        <div class="space-y-2">
          <div>
            <span class="text-label">Mật khẩu </span>
            <span class="text-[#ff3b30]">*</span>
          </div>

          <ElForm ref="formRef" style="max-width: 500px" :model="userSignUp" label-width="auto" class="demo-ruleForm">
            <ElFormItem
              prop="password"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu',
                  trigger: 'blur'
                }
              ]"
            >
              <ElInput
                v-model="userSignUp.password"
                class="input"
                style="height: 50px; width: 500px"
                placeholder="Vui lòng nhập mật khẩu"
                type="password"
                show-password
              />
            </ElFormItem>
          </ElForm>
        </div>
        <div class="space-y-2">
          <div>
            <span class="text-label">Xác nhận mật khẩu </span>
            <span class="text-[#ff3b30]">*</span>
          </div>

          <ElForm ref="formRef" style="max-width: 500px" :model="userSignUp" label-width="auto" class="demo-ruleForm">
            <ElFormItem
              prop="confirmPassword"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập lại mật khẩu',
                  trigger: 'blur'
                }
              ]"
            >
              <ElInput
                v-model="userSignUp.confirmPassword"
                class="input"
                style="height: 50px; width: 500px"
                placeholder="Vui lòng nhập lại mật khẩu"
                type="password"
                show-password
              />
            </ElFormItem>
          </ElForm>
        </div>
      </div>
      <div class="flex justify-end">
        <BaseButton :disabled="disabled" :loading="loadingBtn" size="large" class="w-40" @click="handleSinup"
          >Đăng kí tài khoản</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiAuth, apiParams } from '@/services'

import type { IDistrict, IProvince, IWard } from '@/types/param.types'
import type { UserReq } from '@/types/user.types'

import { useConvertUTCTime } from '@/composables/useConvertUTCTime'

import { SEX } from '../constants/index'

onMounted(() => {
  getListProvince()
})

const loading = ref<boolean>(false)
const loadingBtn = ref<boolean>(false)
const districts = ref<IDistrict[]>([])
const wards = ref<IWard[]>([])
const codeProvince = ref<number | string>('')
const codeDistrict = ref<number | string>('')
const userSignUp = ref<UserReq>({} as UserReq)
const province = ref<IProvince[]>([])
const checkDob = ref<boolean>(false)
const checkGender = ref<boolean>(false)
const checkProvince = ref<boolean>(false)
const checkValDistrict = ref<boolean>(false)
const checkValWard = ref<boolean>(false)

const getListProvince = async () => {
  try {
    loading.value = true
    const rs = await apiParams.getListProvince()
    province.value = rs
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}
const getListDistrict = async () => {
  try {
    const rs = await apiParams.getListDistrict(codeProvince.value)
    districts.value = rs.districts
  } catch (error) {
    console.log(error)
  }
}
const getListWards = async () => {
  try {
    const rs = await apiParams.getListWards(codeDistrict.value)
    wards.value = rs.wards
  } catch (error) {
    console.log(error)
  }
}
const blurDatePicker = () => {
  userSignUp.value.dob ? (checkDob.value = false) : (checkDob.value = true)
}
const blurSex = () => {
  userSignUp.value.gender ? (checkGender.value = false) : (checkGender.value = true)
}
const blurProvince = () => {
  userSignUp.value.province ? (checkProvince.value = false) : (checkProvince.value = true)
}
const checkDistrict = computed(() => {
  return !codeProvince.value
})
const blurDistrict = () => {
  if (userSignUp.value.province) {
    userSignUp.value.district ? (checkValDistrict.value = false) : (checkValDistrict.value = true)
  } else {
    return
  }
}
const checkWard = computed(() => {
  return !codeDistrict.value
})
const blurWard = () => {
  if (userSignUp.value.district) {
    userSignUp.value.commune ? (checkValWard.value = false) : (checkValWard.value = true)
  } else {
    return
  }
}
const handleSinup = async () => {
  try {
    loadingBtn.value = true
    const rs = await apiAuth.signup({ ...userSignUp.value, dob: useConvertUTCTime(userSignUp.value.dob, 'FROM') })
    console.log('🚀 ~ handleSinup ~ rs:', rs)
    ElMessage.success(rs.message)
    loadingBtn.value = false
  } catch (error) {
    console.log(error)
  }
}

const disabled = computed(() => {
  return !(
    userSignUp.value.cccd &&
    userSignUp.value.commune &&
    userSignUp.value.confirmPassword &&
    userSignUp.value.district &&
    userSignUp.value.dob &&
    userSignUp.value.email &&
    userSignUp.value.gender &&
    userSignUp.value.name &&
    userSignUp.value.password &&
    userSignUp.value.phoneNumber &&
    userSignUp.value.province
  )
})
</script>

<style scoped lang="scss">
.text-label {
  @apply text-xl font-medium text-[#003553];
}
.style-flex {
  @apply flex items-start justify-between;
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
:deep(.validate.date-picker) {
  .el-input__wrapper {
    border: none !important;
    box-shadow: 0 0 0 1px #f56c6c inset;
  }
}
:deep(.validate-select.base-select) {
  .el-select {
    .el-select__wrapper {
      border: none !important;
      box-shadow: 0 0 0 1px #f56c6c inset !important;
    }
  }
}
</style>
