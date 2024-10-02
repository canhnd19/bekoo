<template>
  <div class="grid h-full w-full grid-cols-[1fr_1fr] bg-[#f1eff2]">
    <div class="mx-auto">
      <img src="/images/header_logo.png" class="mx-auto my-7" />
      <p class="mb-[18px] text-center">Vui lòng đăng nhập để tiếp tục</p>
      <ElForm
        ref="formRef"
        style="max-width: 600px"
        :model="loginValidateForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <ElFormItem prop="phoneNumber" :rules="{ required: true, message: 'Vui lòng nhập số điện thoại!' }">
          <ElInput
            v-model.number="loginValidateForm.phoneNumber"
            class="input"
            autocomplete="off"
            style="width: 430px; height: 50px"
            placeholder="Số điện thoại"
          />
        </ElFormItem>
        <ElFormItem prop="password" :rules="{ required: true, message: 'Vui lòng nhập mật khẩu!' }">
          <ElInput
            v-model.number="loginValidateForm.password"
            class="input"
            autocomplete="off"
            style="width: 430px; height: 50px"
            type="password"
            placeholder="Mật khẩu"
            show-password
          />
        </ElFormItem>
      </ElForm>
      <BaseButton :disabled="disabled" size="large">Đăng nhập</BaseButton>
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

const formRef = ref<FormInstance>()

const loginValidateForm = reactive({
  phoneNumber: '',
  password: ''
})

const disabled = computed(() => {
  return !(loginValidateForm.phoneNumber && loginValidateForm.password)
})
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
</style>
