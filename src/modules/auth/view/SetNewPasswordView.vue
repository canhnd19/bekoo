<template>
  <div class="layout">
    <div class="content">
      <div>
        <p class="text-label mb-3">Đặt lại mật khẩu</p>
        <div class="mt-[60px] space-y-8">
          <ElInput
            v-model="newPass.password"
            class="input"
            autocomplete="off"
            style="width: 100%; height: 56px"
            type="password"
            placeholder="Nhập mật khẩu mới"
            show-password
          />
          <ElInput
            v-model="newPass.confirmPassword"
            class="input"
            autocomplete="off"
            style="width: 100%; height: 56px"
            type="password"
            placeholder="Nhập mật lại khẩu mới"
            show-password
          />
          <BaseButton :loading="loading" :disabled="disabled" size="large" class="mx-auto mb-8 w-52" @click="confirm"
            >Xác nhận</BaseButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiAuth } from '@/services'

const router = useRouter()

const loading = ref<boolean>(false)
const newPass = reactive({
  password: '',
  confirmPassword: ''
})

const disabled = computed(() => {
  return !(newPass.password && newPass.confirmPassword)
})
const confirm = async () => {
  try {
    loading.value = true
    const email = sessionStorage.getItem('email') as string
    const rs = await apiAuth.newPass({
      email,
      newPassword: newPass.password,
      confirmPassword: newPass.confirmPassword
    })
    sessionStorage.clear()
    ElMessage.success(rs.message)
    router.push({ name: 'Home' })
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
