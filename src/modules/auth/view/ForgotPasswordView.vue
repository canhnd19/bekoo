<template>
  <div class="layout">
    <div class="content">
      <!-- <div class="space-y-10">
        <p class="text-label">Quên mật khẩu</p>
        <ElInput
          class="input"
          autocomplete="off"
          style="width: 100%; height: 50px"
          type="text"
          placeholder="Số điện thoại"
        />
        <BaseButton size="large" class="mx-auto w-52">Xác nhận</BaseButton>
      </div> -->
      <div>
        <p class="text-label mb-3">Nhập OTP</p>
        <p class="mb-8 text-center">
          Mã xác thực OTP vừa được gửi đến email của bạn. Vui lòng nhập mã OTP để đặt lại mật khẩu!
        </p>
        <div class="flex items-center justify-center space-x-2">
          <ElInput class="input" autocomplete="off" style="width: 56px; height: 56px" type="text" />
          <ElInput class="input" autocomplete="off" style="width: 56px; height: 56px" type="text" />
          <ElInput class="input" autocomplete="off" style="width: 56px; height: 56px" type="text" />
          <ElInput class="input" autocomplete="off" style="width: 56px; height: 56px" type="text" />
          <ElInput class="input" autocomplete="off" style="width: 56px; height: 56px" type="text" />
          <ElInput class="input" autocomplete="off" style="width: 56px; height: 56px" type="text" />
        </div>
        <p class="mb-3 mt-8 text-center text-4xl font-bold text-primary">{{ time }}s</p>
        <BaseButton size="large" class="mx-auto mb-8 w-52">Xác nhận</BaseButton>
        <p class="text-center">
          Ban không nhận được OTP,
          <span class="cursor-pointer text-primary" :class="{ disable: time }" @click="startCountdown">
            gửi lại OTP?</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const TIME_COUNTDOWN = 60
const time = ref<number>(TIME_COUNTDOWN) // 60 seconds = 1 minute

onMounted(() => {
  startCountdown() // Start the countdown when the component is created
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
.disable {
  cursor: default;
  pointer-events: none;
}
</style>
