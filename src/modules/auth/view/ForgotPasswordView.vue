<template>
  <div class="layout">
    <div class="content">
      <div class="space-y-10">
        <p class="text-label">Quên mật khẩu</p>
        <ElForm ref="formRef" :model="fogotPass" label-width="auto" class="demo-ruleForm">
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
              v-model="fogotPass.email"
              class="input"
              autocomplete="off"
              style="width: 430px; height: 50px"
              placeholder="Vui lòng nhập email"
            />
          </ElFormItem>
        </ElForm>
        <BaseButton :disabled="disabled" :loading="loading" size="large" class="mx-auto w-52" @click="confirm"
          >Xác nhận</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiAuth } from '@/services'

import { REGEX_EMAIL } from '@/constants/regex'

const router = useRouter()

const loading = ref<boolean>(false)

const fogotPass = reactive({
  email: ''
})

const disabled = computed(() => {
  return !fogotPass.email || !REGEX_EMAIL.test(fogotPass.email)
})

const confirm = async () => {
  try {
    loading.value = true
    await apiAuth.forgotPass({ email: fogotPass.email })
    sessionStorage.setItem('email', fogotPass.email)
    router.push({ name: 'PinCode' })
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.layout {
  @apply flex min-h-screen items-center justify-center bg-[#e8f2f7];
}
.content {
  width: 680px;
  flex-shrink: 0;
  border-radius: 30px;
  opacity: 0.8;
  background: #fff;
  padding: 56px 100px;
  box-shadow:
    -16px -16px 126px 40px rgba(255, 255, 255, 0.5) inset,
    16px 16px 126px 40px rgba(255, 255, 255, 0.52) inset,
    0px 20px 26px 0px rgba(0, 0, 0, 0.05),
    0px 8px 10px 0px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(20px);
}
.text-label {
  @apply text-center text-4xl font-bold;
}
</style>
