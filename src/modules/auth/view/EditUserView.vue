<template>
  <template v-if="loading">
    <PageLoading />
  </template>
  <div v-else class="min-h-screen bg-[#e8f2f7]">
    <div class="container space-y-4 px-20 pb-6">
      <div class="pt-6 text-2xl font-bold">Thông tin cá nhân</div>
      <div class="flex justify-between">
        <div class="flex w-[500px] justify-center">
          <div class="relative w-40">
            <BaseIcon
              v-if="!(user.doctor?.info.linkAvatar || user.patient?.info.linkAvatar)"
              name="avatar-default"
              size="170"
            />
            <img
              v-else
              :src="user.patient?.info ? user.patient?.info.linkAvatar : user.doctor?.info.linkAvatar"
              alt=""
              class="h-40 w-full rounded-full object-cover"
            />
            <ElUpload
              :show-file-list="false"
              :auto-upload="false"
              accept=".png, .jpg, .webp, .jpeg"
              :on-change="handleSelectFile"
              class="absolute bottom-5 right-2"
            >
              <div class="border-border-table rounded-full border border-solid bg-white p-2">
                <BaseIcon name="edit-avatar" />
              </div>
            </ElUpload>
          </div>
        </div>
        <div>
          <div>
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
        <BaseButton :disabled="disabled" :loading="loadingBtn" size="large" class="w-36" @click="handleEdit"
          >Sửa</BaseButton
        >
      </div>

      <template v-if="user.patient?.info.id">
        <div class="pt-6 text-2xl font-bold">Thông tin bệnh nhân</div>
        <div class="style-flex">
          <div class="space-y-2">
            <p class="text-label">Số bảo hiểm y tế</p>
            <ElInput
              v-model="infoPatient.healthInsuranceNumber"
              class="input"
              style="height: 50px; width: 500px"
              placeholder="Vui lòng nhập số bảo hiểm y tế"
            />
          </div>
          <div class="space-y-2">
            <p class="text-label">Nhóm máu</p>
            <ElInput
              v-model="infoPatient.bloodType"
              class="input"
              style="height: 50px; width: 500px"
              placeholder="Vui lòng nhập nhóm máu"
            />
          </div>
        </div>
        <div class="pt-6 text-2xl font-bold">Thông tin liên hệ khẩn cấp</div>
        <div class="style-flex">
          <div class="space-y-2">
            <p class="text-label">Tên</p>
            <ElInput
              v-model="infoPatient.emergencyContactCommand.name"
              class="input"
              style="height: 50px; width: 500px"
              placeholder="Nhập tên người liên hệ khẩn cấp"
            />
          </div>
          <div class="space-y-2">
            <p class="text-label">Số điện thoại</p>
            <ElInput
              v-model="infoPatient.emergencyContactCommand.phone"
              class="input"
              style="height: 50px; width: 500px"
              placeholder="Nhập số điện thoại người liên hệ khẩn cấp"
            />
          </div>
        </div>
        <div class="style-flex">
          <div class="space-y-2">
            <p class="text-label">Địa chỉ</p>
            <ElInput
              v-model="infoPatient.emergencyContactCommand.address"
              class="input"
              style="height: 50px; width: 500px"
              placeholder="Nhập địa chỉ người liên hệ khẩn cấp"
            />
          </div>
          <div class="space-y-2">
            <p class="text-label">Mối quan hệ với bênh nhân</p>
            <ElInput
              v-model="infoPatient.emergencyContactCommand.relationship"
              class="input"
              style="height: 50px; width: 500px"
              placeholder="Nhập mối quan hệ giữa người liên hệ khẩn cấp và bệnh nhân"
            />
          </div>
        </div>
        <div class="flex justify-end">
          <BaseButton :loading="loadingBtnUpdate" size="large" class="w-40" @click="handleUpdate">Cập nhật</BaseButton>
        </div>
      </template>
      <template v-else-if="user.doctor?.id">
        <div class="pt-6 text-2xl font-bold">Thông tin nghề nghiệp</div>

        <div class="style-flex">
          <!-- <div class="space-y-2">
            <p class="text-label">Trình độ học vấn</p>
            <BaseSelect v-model="doctorEdit.trainingBy" placeholder="" class="select" :clearable="false">
              <ElOption v-for="(item, index) in EDUCATION" :key="index" :label="item.label" :value="item.value" />
            </BaseSelect>
          </div> -->
          <div class="w-full space-y-2">
            <p class="text-label">Mô tả</p>
            <ElInput
              v-model="doctorEdit.description"
              class="input"
              :autosize="{ minRows: 2 }"
              type="textarea"
              placeholder="Vui lòng nhập mô tả"
            />
          </div>
        </div>
        <div class="flex justify-end">
          <BaseButton :loading="loadingBtnUpdate" size="large" class="w-36" @click="handleEditDoctor">Sửa</BaseButton>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { EDUCATION } from '@/constants'
import { apiAuth, apiDoctor, apiParams, apiPatient, apiUpload } from '@/services'

import type { IDistrict, IProvince, IWard } from '@/types/param.types'
import type { InfoPatientReq, UserReq } from '@/types/user.types'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const { user, patient, getPatientInfo } = useAuthStore()
onMounted(() => {
  getListProvince()
})
const file = ref<Record<string, any>>({})
const loading = ref<boolean>(false)
const loadingBtn = ref<boolean>(false)
const loadingBtnUpdate = ref<boolean>(false)
const province = ref<IProvince[]>([])
const districts = ref<IDistrict[]>([])
const wards = ref<IWard[]>([])
const codeProvince = ref<number | string>('')
const provinceName = ref<string>(user.patient?.info ? user.patient.info.province : user.doctor!.info.province)
const districtName = ref<string>(user.patient?.info ? user.patient.info.district : user.doctor!.info.district)
const wardName = ref<string>(user.patient?.info ? user.patient.info.commune : user.doctor!.info.commune)
const codeDistrict = ref<number | string>('')
const userEdit = ref<UserReq>({
  name: user.patient?.info ? user.patient.info.name : user.doctor!.info.name,
  province: user.patient?.info ? user.patient.info.province : user.doctor!.info.province,
  district: user.patient?.info ? user.patient.info.district : user.doctor!.info.district,
  commune: user.patient?.info ? user.patient.info.commune : user.doctor!.info.commune,
  aboutAddress: user.patient?.info ? user.patient.info.aboutAddress : user.doctor!.info.aboutAddress
} as UserReq)

const infoPatient = reactive<InfoPatientReq>({
  userId: user.patient?.info ? user.patient.info.id : user.doctor!.info.id,
  healthInsuranceNumber: patient.healthInsuranceNumber,
  bloodType: patient.bloodType,
  emergencyContactCommand: {
    name: patient.emergencyContacts ? patient.emergencyContacts[0].name : '',
    phone: patient.emergencyContacts ? patient.emergencyContacts[0]?.phone : '',
    address: patient.emergencyContacts ? patient.emergencyContacts[0]?.address : '',
    relationship: patient.emergencyContacts ? patient.emergencyContacts[0]?.relationship : ''
  }
})
const doctorEdit = reactive<{
  trainingBy: string
  description: string
}>({
  trainingBy: user.doctor ? user.doctor.trainingBy : '',
  description: user.doctor ? user.doctor.description : ''
})
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
    file.value ? await uploadFile() : null
    const dataEdit = {
      ...userEdit.value,
      id: user.patient?.info ? user.patient.info.id : user.doctor!.info.id,
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
  user.patient?.info
    ? (user.patient.info.linkAvatar = URL.createObjectURL(file.value.raw))
    : (user.doctor!.info.linkAvatar = URL.createObjectURL(file.value.raw))
}

const uploadFile = async () => {
  const formData = new FormData()
  formData.append('fileImage', file.value.raw)
  formData.append('id', user.patient?.info ? user.patient.info.id : user.doctor!.info.id)
  await apiUpload.uploadFile(formData)
}

const handleUpdate = async () => {
  try {
    loadingBtnUpdate.value = true
    const rs = await apiPatient.updatePatientInfo(infoPatient)
    await getPatientInfo()
    ElMessage.success(rs.message)
    router.push({ name: 'Home' })
    loadingBtnUpdate.value = false
  } catch (error) {
    loadingBtnUpdate.value = false
    console.log(error)
  }
}

const handleEditDoctor = async () => {
  try {
    loadingBtnUpdate.value = true
    const body = {
      id: user.doctor?.id,
      trainingBy: doctorEdit.trainingBy,
      description: doctorEdit.description
    }
    const rs = await apiDoctor.editDoctor(body)
    ElMessage.success(rs.message)
    router.push({ name: 'Home' })
    loadingBtnUpdate.value = false
  } catch (error) {
    loadingBtnUpdate.value = false
    console.log(error)
  }
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
    width: 100%;
    border-radius: 8px;
    .el-input__inner {
      font-size: 16px;
    }
  }
}
:deep(.input.el-textarea) {
  .el-textarea__inner {
    font-size: 16px;
    border-radius: 8px;
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
