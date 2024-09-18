import 'element-plus/es/components/message/style/css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import './assets/style/_color.css'
import './assets/style/_tailwind.css'
// NOTE: Import custom styles always after tailwind.css
import './assets/style/custom.scss'
import router from './router'
import { useBaseStore } from './stores/base'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const { isDesktop } = storeToRefs(useBaseStore())
isDesktop.value = window.innerWidth > 1023
// add event resize window
window.addEventListener('resize', () => {
  isDesktop.value = window.innerWidth > 1023
})
app.mount('#app')
