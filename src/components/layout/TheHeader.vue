<template>
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
          <BaseDropdownItem v-for="(item, index) in INSTRUCT" :key="index" :command="item">{{ item }}</BaseDropdownItem>
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

    <div v-if="user.name" class="account">
      <BaseIcon name="user" class="mr-2.5" />
      <span class="items-center text-base font-medium"> {{ user.name }}</span>
    </div>
    <RouterLink v-else :to="{ name: 'Login' }">
      <div class="account">
        <BaseIcon name="user" class="mr-2.5" />
        <span class="items-center text-base font-medium">Tài khoản</span>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

import { CONTACT_FOR_COOPERATION, INSTRUCT, MEDICAL_SERVICES, NEWS } from '../../constants/index'

const { user } = useAuthStore()
</script>
<style scoped lang="scss">
.layout-header {
  @apply mx-auto flex w-full max-w-7xl items-center justify-around;
  .text {
    @apply text-base font-semibold text-secondary hover:text-primary;
  }
  .account {
    @apply flex cursor-pointer items-center justify-center rounded-[30px] border border-solid border-primary px-[15px] py-[10px] text-primary;
    &:hover {
      background: linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%);
      @apply text-white;
    }
  }
}
</style>
