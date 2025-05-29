import 'element-plus/es/components/message/style/css'
import Cookies from 'js-cookie'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import './assets/style/_color.css'
import './assets/style/_tailwind.css'
// NOTE: Import custom styles always after tailwind.css
import './assets/style/custom.scss'
import './assets/style/index.scss'
import router from './router'
import { useAuthStore } from './stores/auth'
import { useBaseStore } from './stores/base'

const app = createApp(App)

app.use(createPinia())

const init = async () => {
  const { isDesktop } = storeToRefs(useBaseStore())
  const { getUserInfo, getPatientInfo } = useAuthStore()
  const isLoggedIn = Cookies.get('access_token') ? true : false
  isDesktop.value = window.innerWidth > 1023
  // add event resize window
  window.addEventListener('resize', () => {
    isDesktop.value = window.innerWidth > 1023
  })
  if (isLoggedIn) {
    // await Promise.all([getUserInfo(), getPatientInfo()])
    await getUserInfo()
    await getPatientInfo()
    // window.addEventListener('focus', () => setUserOnlineStatus('online'))
    // window.addEventListener('blur', () => setUserOnlineStatus('offline'))
    document.addEventListener('visibilitychange', () => {
      setUserOnlineStatus(document.visibilityState === 'visible' ? 'online' : 'offline')
    })
    setUserOnlineStatus('online')
  }
  app.use(router)
  app.mount('#app')
}
init()

/*
- đổi lấy danh sách người dùng chat từ api qua socket (phục vụ làm cái trạng thái hoạt động) 
- clinet emit message "GET LIST USER CHAT" => lấy danh sách người dùng (5p sẽ emit 1 lần tránh thao tác với db liên tục)
- trạng thái hoạt động của người dùng: cline emit 1 obj gồm {
      type: 'USER_STATUS',
      status: 'online' | 'offline',
      time:
      userId: string
    }, BE nhận được và cập nhập vào đb (có thể dùng cronjob để cập nhật trạng thái hoạt động của người dùng sau 1 khoảng thời 
        gian để tránh thao tác với db liện tục)
- dữ liệu danh sách user trả ra sắp xếp theo tin nhắn gần nhất (data gồm gì thì đã gửi hôm nọ)
- lấy dữ liệu lịch sử chat thì cline emit 1 obj gồm { userId, content:"GET MESSAGE"} => BE lấy dữ liệu lịch sử chat (sắp xếp theo thời gian chat, chú ý format thời gian)
- những content đặc biệt thì ko lưu db như: "GET MESSAGE", "GET LIST USER CHAT"

- nên kế hoạch làm cái đã xem tin nhắn (admin) + tin nhắn chưa đọc
*/
