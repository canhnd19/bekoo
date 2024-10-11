<template>
  <div class="layout">
    <div class="content">
      <div>
        <p class="text-label mb-3">Nhập OTP</p>
        <p class="mb-8 text-center">
          Mã xác thực OTP vừa được gửi đến email của bạn. Vui lòng nhập mã OTP để đặt lại mật khẩu!
        </p>
        <div class="flex items-center justify-center space-x-2">
          <ElInput v-model="num1" class="input-otp" autocomplete="off" style="width: 56px; height: 56px" type="text" />
          <ElInput v-model="num2" class="input-otp" autocomplete="off" style="width: 56px; height: 56px" type="text" />
          <ElInput v-model="num3" class="input-otp" autocomplete="off" style="width: 56px; height: 56px" type="text" />
          <ElInput v-model="num4" class="input-otp" autocomplete="off" style="width: 56px; height: 56px" type="text" />
          <ElInput v-model="num5" class="input-otp" autocomplete="off" style="width: 56px; height: 56px" type="text" />
          <ElInput v-model="num6" class="input-otp" autocomplete="off" style="width: 56px; height: 56px" type="text" />
        </div>
        <p class="mb-3 mt-8 text-center text-4xl font-bold text-primary">{{ time }}s</p>
        <BaseButton :loading="loading" size="large" class="mx-auto mb-8 w-52" @click="conFirm">Xác nhận</BaseButton>
        <p class="text-center">
          Ban không nhận được OTP,
          <span class="cursor-pointer text-primary" :class="{ disable: time }" @click="resendOtp"> gửi lại OTP?</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiAuth } from '@/services'

const router = useRouter()

const TIME_COUNTDOWN = 60
const time = ref<number>(TIME_COUNTDOWN) // 60 seconds = 1 minute
const num1 = ref<string>('')
const num2 = ref<string>('')
const num3 = ref<string>('')
const num4 = ref<string>('')
const num5 = ref<string>('')
const num6 = ref<string>('')
const loading = ref<boolean>(false)
const email = ref<string>('')
onMounted(() => {
  startCountdown() // Start the countdown when the component is created
  email.value = sessionStorage.getItem('email') as string
})

const startCountdown = () => {
  time.value = TIME_COUNTDOWN
  const timer = setInterval(() => {
    if (time.value > 0) {
      time.value--
    } else {
      clearInterval(timer)
    }
  }, 1000) // Update every second
}

const combineNumbers = (num1: string, num2: string, num3: string, num4: string, num5: string, num6: string) => {
  // Validate input: Ensure all numbers are single digits
  if (/[^0-9]/.test(num1 + num2 + num3 + num4 + num5 + num6)) {
    return 'Invalid input: All numbers must be single digits.'
  }
  // Combine the strings and convert back to a number
  const combinedNumber = parseInt(num1 + num2 + num3 + num4 + num5 + num6)
  // Check if the combined number is within the valid 6-digit range
  if (combinedNumber < 100000 || combinedNumber > 999999) {
    ElMessage.error('Invalid OTP')
    return
  }
  return combinedNumber
}

const conFirm = async () => {
  try {
    loading.value = true
    const OTP = combineNumbers(num1.value, num2.value, num3.value, num4.value, num5.value, num6.value)
    await apiAuth.pinCode({ code: OTP as string, email: email.value as string })
    router.push({ name: 'SetNewPassword' })
    sessionStorage.clear()
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}
const resendOtp = async () => {
  try {
    await apiAuth.forgotPass({ email: email.value })
    startCountdown()
  } catch (error) {
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
  .text-label {
    @apply text-center text-4xl font-bold;
  }
  .disable {
    cursor: default;
    pointer-events: none;
  }
  .is-loading {
    animation: rotating 2s linear infinite;
  }
}
:deep(.input-otp.el-input) {
  .el-input__wrapper {
    .el-input__inner {
      font-size: 20px;
      text-align: center;
    }
  }
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
