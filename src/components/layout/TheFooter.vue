<template>
  <div>
    <div class="layout-footer">
      <div>
        <img src="/images/footer_logo.png" />
        <p>
          <span class="style-text-primary">Địa chỉ: </span>
          <span>Đang cập nhập...</span>
        </p>
        <p>
          <span class="style-text-primary"> Website: </span>
          <span>Đang cập nhập...</span>
        </p>
        <p>
          <span class="style-text-primary">Email: </span>
          <span>Đang cập nhập...</span>
        </p>
        <p>
          <span class="style-text-primary">Điện thoại: </span>
          <span>Đang cập nhập...</span>
        </p>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <p class="font-bold">Dịch vụ y tế</p>
          <p class="style-text-secondary">Đặt khám theo bác sĩ</p>
          <p class="style-text-secondary">Tư vấn khám bệnh qua video</p>
          <p class="style-text-secondary">Đặt lịch xét nghiệm</p>
          <p class="style-text-secondary">Gói khám sức khỏe</p>
          <p class="style-text-secondary">Đặt lịch tiêm chủng</p>
          <p class="style-text-secondary">Y tế tại nhà</p>
          <p class="style-text-secondary">Thanh toán Viện phí</p>
        </div>
        <div>
          <p class="font-bold">Hướng dẫn</p>
          <p class="style-text-secondary">Đặt lịch khám</p>
          <p class="style-text-secondary">Tư vấn khám bệnh qua video</p>
          <p class="style-text-secondary">Quy trình hoàn phí</p>
          <p class="style-text-secondary">Câu hỏi thường gặp</p>
          <p class="style-text-secondary">Quy trình đi khám</p>
        </div>
        <div>
          <p class="font-bold">Liên hệ hợp tác</p>
          <p class="style-text-secondary">Tham gia Medpro</p>
          <p class="style-text-secondary">Khám sức khỏe doanh nghiệp</p>
          <p class="style-text-secondary">Quảng cáo</p>
          <p class="style-text-secondary">Tuyển Dụng</p>
        </div>
        <div>
          <p class="font-bold">Tin tức</p>
          <p class="style-text-secondary">Tin dịch vụ</p>
          <p class="style-text-secondary">Tin Y Tế</p>
          <p class="style-text-secondary">Y Học thường thức</p>
        </div>
        <div>
          <p class="font-bold">Về Medpro</p>
          <p class="style-text-secondary">Giới thiệu</p>
          <p class="style-text-secondary">Điều khoản dịch vụ</p>
          <p class="style-text-secondary">Chính sách bảo mật</p>
          <p class="style-text-secondary">Quy định sử dụng</p>
        </div>
      </div>
    </div>
    <div class="footer">© 2024 - Bản quyền thuộc Công Ty Cổ Phần Ứng Dụng PKH</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout-footer {
  @apply mx-auto mb-4 grid w-full max-w-7xl grid-cols-[350px_1fr];
  .style-text-primary {
    @apply text-base font-semibold;
  }
  .style-text-secondary {
    @apply cursor-pointer hover:text-primary;
  }
}
.footer {
  background: linear-gradient(82.98deg, #00b5f1 33.22%, #00e0ff 135.46%);
  @apply flex h-16 w-full items-center justify-center;
}
</style>
