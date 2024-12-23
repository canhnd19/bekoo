<template>
  <div v-if="isDesktop" class="box-shadow">
    <div class="layout-header">
      <RouterLink :to="{ name: 'Home' }">
        <img src="/images/header_logo.png" class="w-36" />
      </RouterLink>
      <div class="flex items-center justify-around">
        <BaseDropdown :clearable="false" class="dropdown-logo">
          <template #reference>
            <div class="text">Dịch vụ y tế</div>
          </template>
          <template #menu>
            <BaseDropdownItem v-for="(item, index) in MEDICAL_SERVICES" :key="index" :command="item">{{
              item
            }}</BaseDropdownItem>
          </template>
        </BaseDropdown>
        <span class="text cursor-pointer">Khám sức khỏe doanh nghiệp</span>
        <BaseDropdown :clearable="false" class="dropdown-logo">
          <template #reference>
            <div class="text">Dịch vụ y tế</div>
          </template>
          <template #menu>
            <BaseDropdownItem v-for="(item, index) in NEWS" :key="index" :command="item">{{ item }}</BaseDropdownItem>
          </template>
        </BaseDropdown>
        <BaseDropdown :clearable="false" class="dropdown-logo">
          <template #reference>
            <div class="text">Dịch vụ y tế</div>
          </template>
          <template #menu>
            <BaseDropdownItem v-for="(item, index) in INSTRUCT" :key="index" :command="item">{{
              item
            }}</BaseDropdownItem>
          </template>
        </BaseDropdown>
        <BaseDropdown :clearable="false" class="dropdown-logo">
          <template #reference>
            <div class="text">Dịch vụ y tế</div>
          </template>
          <template #menu>
            <BaseDropdownItem v-for="(item, index) in CONTACT_FOR_COOPERATION" :key="index" :command="item">{{
              item
            }}</BaseDropdownItem>
          </template>
        </BaseDropdown>
      </div>

      <ElPopover
        v-if="user.doctor || user.patient"
        placement="bottom"
        :width="200"
        trigger="click"
        popper-class="!p-4 !rounded-xl"
      >
        <template #reference>
          <div class="account relative">
            <BaseIcon name="user" class="mr-2.5" />
            <span class="text-label"> {{ user.doctor ? user.doctor.info.name : user.patient?.info.name }}</span>
          </div>
        </template>
        <div>
          <ul>
            <li v-if="role !== 'USER'" class="option-label" @click="handleClickAdmin">Quản lý</li>
            <template v-if="role === 'USER' || role === 'ADMIN'">
              <li class="option-label" @click="handleViewMedicalRecord">Hồ sơ bệnh án</li>
              <li
                class="option-label"
                @click="router.push({ name: 'BookingHistory', params: { id: user.patient?.id } })"
              >
                Lịch sử đặt lịch khám
              </li>
            </template>
            <li class="option-label" @click="router.push({ name: 'EditUser' })">Sửa thông tin cá nhân</li>
            <li class="option-label" @click="router.push({ name: 'ChangePassword' })">Thay đổi mật khẩu</li>
            <li class="option-label" @click="logout">Đăng xuất</li>
          </ul>
        </div>
      </ElPopover>
      <RouterLink v-else :to="{ name: 'Login' }">
        <div class="account">
          <BaseIcon name="user" class="mr-2.5" />
          <span class="text-label">Tài khoản</span>
        </div>
      </RouterLink>
    </div>
  </div>
  <div v-else>
    <header class="flex items-center justify-between px-6">
      <RouterLink :to="{ name: 'Home' }">
        <img src="/images/header_logo.png" class="w-36" />
      </RouterLink>
      <MenuMb @click="setOpenDrawer('drawer-menu-mb')" />
    </header>
    <BaseDrawer name="drawer-menu-mb" :with-header="false" :modal="false" :append-to-body="false" :show-footer="false">
      <div class="flex items-center justify-between">
        <RouterLink :to="{ name: 'Home' }">
          <img src="/images/header_logo.png" class="w-36" />
        </RouterLink>
        <MenuX class="ml-auto text-black" @click="setOpenDrawer('drawer-menu-mb', false)" />
      </div>

      <BaseButton v-if="!isLoggedIn" class="mt-10" @click="router.push({ name: 'Login' })">Đăng nhập</BaseButton>
      <div v-else>
        <BaseButton v-if="!isLoggedIn" class="mt-10" @click="logout">Đăng xuất</BaseButton>
      </div>
    </BaseDrawer>
  </div>
</template>

<script setup lang="ts">
import MenuMb from '@/icons/menu-mb.svg?skipsvgo'
import MenuX from '@/icons/x.svg?skipsvgo'

import { useAuthStore } from '@/stores/auth'
import { useBaseStore } from '@/stores/base'

import { CONTACT_FOR_COOPERATION, INSTRUCT, MEDICAL_SERVICES, NEWS } from '../../constants/index'

const { setOpenDrawer } = useBaseStore()

const { isDesktop } = storeToRefs(useBaseStore())
const { logout } = useAuthStore()
const router = useRouter()
const { user, patient, role } = useAuthStore()
const { isLoggedIn } = storeToRefs(useAuthStore())
const handleViewMedicalRecord = () => {
  if (patient.id) {
    router.push({ name: 'MedicalRecord', params: { id: patient.id } })
  } else {
    ElMessage.warning('Vui lòng cập nhật Thông tin bệnh nhân')
    router.push({ name: 'EditUser' })
  }
}
const handleClickAdmin = () => {
  role === 'ADMIN'
    ? router.push({ name: 'Reports' })
    : router.push({ name: 'MedicalSchedule', params: { id: user.doctor?.id } })
}
</script>
<style scoped lang="scss">
.box-shadow {
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.04),
    0 2px 6px rgba(0, 0, 0, 0.04),
    0 0 1px rgba(0, 0, 0, 0.04);
  .layout-header {
    @apply mx-auto flex w-full max-w-7xl items-center justify-between;

    .text {
      @apply text-base font-semibold text-secondary hover:text-primary;
    }
    .account {
      @apply flex cursor-pointer items-center justify-center rounded-[30px] border border-solid border-primary px-[15px] py-[10px] text-primary;
      &:hover {
        background: linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%);
        @apply text-white;
        .text-label {
          @apply items-center text-base font-medium;
        }
      }
    }
  }
}
.option-label {
  @apply cursor-pointer py-2 text-base text-secondary hover:!text-[#11a2f3];
}
</style>
