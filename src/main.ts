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
  const { getUserInfo } = useAuthStore()
  const isLoggedIn = Cookies.get('access_token') ? true : false
  isDesktop.value = window.innerWidth > 1023
  // add event resize window
  window.addEventListener('resize', () => {
    isDesktop.value = window.innerWidth > 1023
  })
  if (isLoggedIn) {
    await getUserInfo()
  }
  app.use(router)
  app.mount('#app')
}
init()
