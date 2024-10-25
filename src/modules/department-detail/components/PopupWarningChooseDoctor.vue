<template>
  <BasePopup name="popup-warning-choose-doctor" width="500">
    <template #title> Thông báo </template>
    <p class="text-base">
      Quý khách lưu ý về tiện ích lựa chọn Bác sĩ, có một vài trường hợp Bác sĩ được chọn bận đột xuất, cơ sở y tế sẽ
      thay thế bằng Bác sĩ khác nhưng chưa thể thông báo kịp thời đến quý khách. Mong quý khách thông cảm!
    </p>
    <template #footer>
      <div class="flex items-center justify-end space-x-3">
        <BaseButton type="plain" size="small" class="w-20" @click="emits('close')">Đóng</BaseButton>
        <BaseButton size="small" class="w-20" @click="emits('agree')">Đồng ý</BaseButton>
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  close: []
  agree: []
}>()
</script>

<style scoped lang="scss"></style>
