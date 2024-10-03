<template>
  <div class="layout">
    <div class="content">
      <div class="space-y-10">
        <p class="text-label">Quên mật khẩu</p>
        <ElInput
          class="input"
          autocomplete="off"
          style="width: 100%; height: 50px"
          type="text"
          placeholder="Số điện thoại"
        />
        <BaseButton size="large" class="mx-auto w-52">Xác nhận</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
