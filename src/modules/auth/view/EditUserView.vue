<template>
  <template v-if="loading">
    <PageLoading />
  </template>
  <div v-else class="min-h-screen bg-[#e8f2f7]">
    <div>
      <span @click="uploadFile">Test upload image</span>
      <ElUpload
        :show-file-list="false"
        :auto-upload="false"
        list-type="picture"
        accept=".png, .jpg, .webp, .jpeg"
        :on-change="handleSelectFile"
      >
        <p class="cursor-pointer text-[#0A34C7]">Click to upload</p>
      </ElUpload>
    </div>

    <div class="container space-y-4 px-20 pb-6">
      <div class="pt-6 text-2xl font-bold">Thông tin cá nhân</div>
      <div class="flex">
        <div class="mr-[120px] space-y-2">
          <div>
            <span class="text-label">Họ và tên (có dấu) </span>
            <span class="text-[#ff3b30]">*</span>
          </div>

          <ElForm ref="formRef" style="max-width: 500px" :model="userEdit" label-width="auto" class="demo-ruleForm">
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
                v-model="userEdit.name"
                class="input"
                style="height: 50px; width: 500px"
                placeholder="VÍ DỤ: NGỌ ĐỨC CẢNH"
              />
            </ElFormItem>
          </ElForm>
        </div>
        <div>
          <div class="mb-2">
            <span class="text-label">Tỉnh / Thành </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <BaseSelect
            v-model="userEdit.province"
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
                    provinceName = item.name as string
                    codeProvince = item.code
                  }
                "
              >
                {{ item.name }}
              </p></ElOption
            >
          </BaseSelect>
          <p v-if="checkProvince" class="-!mt-1 text-xs text-[#f56c6c]">Vui lòng chọn tỉnh/thành</p>
        </div>
      </div>

      <div class="style-flex h-[102px]">
        <div>
          <div class="mb-2">
            <span class="text-label">Quận / Huyện </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <BaseSelect
            v-model="userEdit.district"
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
                    districtName = item.name as string
                    codeDistrict = item.code
                  }
                "
              >
                {{ item.name }}
              </p>
            </ElOption>
          </BaseSelect>
          <p v-if="checkValDistrict" class="-!mt-1 text-xs text-[#f56c6c]">Vui lòng chọn quận/huyện</p>
        </div>
        <div>
          <div class="mb-2">
            <span class="text-label">Phường / Xã </span>
            <span class="text-[#ff3b30]">*</span>
          </div>
          <BaseSelect
            v-model="userEdit.commune"
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
                    wardName = item.name
                  }
                "
              >
                {{ item.name }}
              </p>
            </ElOption>
          </BaseSelect>
          <p v-if="checkValWard" class="-!mt-1 text-xs text-[#f56c6c]">Vui lòng chọn phường/xã</p>
        </div>
      </div>

      <div class="style-flex h-[102px]">
        <div class="space-y-2">
          <p class="text-label">Địa chỉ hiện tại</p>
          <ElInput
            v-model="userEdit.aboutAddress"
            class="input"
            style="height: 50px; width: 500px"
            placeholder="Vui lòng nhập địa chỉ hiện tại"
          />
        </div>
      </div>

      <div class="flex justify-end">
        <BaseButton :disabled="disabled" :loading="loadingBtn" size="large" class="w-40" @click="handleEdit"
          >Sửa</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiAuth, apiParams, apiUpload } from '@/services'

import type { IDistrict, IProvince, IWard } from '@/types/param.types'
import type { UserReq } from '@/types/user.types'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const { user } = useAuthStore()
onMounted(() => {
  getListProvince()
})
const file = ref<Record<string, any>>({})
const loading = ref<boolean>(false)
const loadingBtn = ref<boolean>(false)
const province = ref<IProvince[]>([])
const districts = ref<IDistrict[]>([])
const wards = ref<IWard[]>([])
const codeProvince = ref<number | string>('')
const provinceName = ref<string>(user.province)
const districtName = ref<string>(user.district)
const wardName = ref<string>(user.commune)
const codeDistrict = ref<number | string>('')
const userEdit = ref<UserReq>({
  name: user.name,
  province: user.province,
  district: user.district,
  commune: user.commune,
  aboutAddress: user.aboutAddress
} as UserReq)
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

const blurProvince = () => {
  userEdit.value.province ? (checkProvince.value = false) : (checkProvince.value = true)
}
const checkDistrict = computed(() => {
  return !userEdit.value.district
})
const blurDistrict = () => {
  if (userEdit.value.province) {
    userEdit.value.district ? (checkValDistrict.value = false) : (checkValDistrict.value = true)
  } else {
    return
  }
}
const checkWard = computed(() => {
  return !userEdit.value.commune
})
const blurWard = () => {
  if (userEdit.value.district) {
    userEdit.value.commune ? (checkValWard.value = false) : (checkValWard.value = true)
  } else {
    return
  }
}

const disabled = computed(() => {
  return !(userEdit.value.commune && userEdit.value.district && userEdit.value.name && userEdit.value.province)
})

const handleEdit = async () => {
  try {
    loadingBtn.value = true
    const dataEdit = {
      ...userEdit.value,
      id: user.id,
      province: provinceName.value,
      district: districtName.value,
      commune: wardName.value
    }
    const rs = await apiAuth.editUser(dataEdit)
    ElMessage.success(rs.message)
    router.push({ name: 'Home' })
    loadingBtn.value = false
  } catch (error) {
    loadingBtn.value = false
    console.log(error)
  }
}
const handleSelectFile = async (_file: Record<string, any>) => {
  file.value = _file
  console.log('🚀 ~ handleSelectFile ~ _file:', _file)
}

const uploadFile = async () => {
  const formData = new FormData()
  formData.append('fileImage', file.value.raw)
  formData.append('id', user.id)

  const rs = await apiUpload.uploadFile(formData)
  console.log('🚀 ~ uploadFile ~ rs:', rs)
}
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
