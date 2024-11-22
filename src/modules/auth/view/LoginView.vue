<template>
  <div class="grid h-full w-full grid-cols-[1fr_1fr] bg-[#f1eff2]">
    <div class="mx-auto">
      <img src="/images/header_logo.png" class="mx-auto my-7" />
      <p class="mb-[18px] text-center">Vui lòng đăng nhập để tiếp tục</p>
      <ElForm ref="formRef" :model="loginForm" label-width="auto" class="demo-ruleForm" @submit.prevent="handleLogin">
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
            v-model="loginForm.email"
            class="input"
            autocomplete="off"
            style="width: 430px; height: 50px"
            placeholder="Vui lòng nhập email"
            @keyup.enter="handleLogin"
          />
        </ElFormItem>
        <ElFormItem prop="password" :rules="{ required: true, message: 'Vui lòng nhập mật khẩu!' }">
          <ElInput
            v-model="loginForm.password"
            class="input"
            autocomplete="off"
            style="width: 430px; height: 50px"
            type="password"
            placeholder="Mật khẩu"
            show-password
            @keyup.enter="handleLogin"
          />
        </ElFormItem>
      </ElForm>
      <RouterLink :to="{ name: 'ForgotPassword' }" class="forgot-password">Quên mật khẩu</RouterLink>
      <BaseButton :disabled="disabled" :loading="loading" size="large" @click="handleLogin">Đăng nhập</BaseButton>
      <div class="my-10 border-b border-solid border-[#cacaca]"></div>
      <p class="text-center">
        <span>Chưa có tài khoản? </span>
        <RouterLink :to="{ name: 'SignUp' }" class="cursor-pointer text-primary">Đăng ký ngay</RouterLink>
      </p>
    </div>
    <div class="banner-login">
      <div class="style_shape__1HA08"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const { login, setBearerToken } = useAuthStore()
const formRef = ref<FormInstance>()
const loading = ref<boolean>(false)
const loginForm = reactive({
  email: '',
  password: ''
})

const disabled = computed(() => {
  return !(loginForm.email && loginForm.password)
})

const handleLogin = async () => {
  try {
    loading.value = true
    const { tokenContent } = await login({ ...loginForm })
    setBearerToken(tokenContent)
    router.push({ name: 'Home' })
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}
</script>

<style scoped lang="scss">
.banner-login {
  background-image: url(/images/banner_login.png);
  height: 100vh;
  background-position: center;
  position: relative;

  .style_shape__1HA08 {
    background-color: #f1eff2;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 50px;
    -webkit-clip-path: polygon(0 0, 100% 0, 75% 100%, 0 100%);
    clip-path: polygon(0 0, 100% 0, 5% 100%, 0 100%);
  }
}
:deep(.input.el-input) {
  .el-input__wrapper {
    border-radius: 8px;
  }
}
.forgot-password {
  @apply mb-[18px] flex w-full cursor-pointer justify-end text-right text-base text-primary;
}
</style>
