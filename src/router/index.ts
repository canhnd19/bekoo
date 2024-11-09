import listRouter from '@/modules'
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useBaseStore } from '@/stores/base'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...listRouter,
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../NotFound.vue')
    }
  ]
})

// ../NotFound.vue

router.beforeEach((to, _from, next) => {
  const { emptyDrawerAndPopup } = useBaseStore()
  const { isLoggedIn, role } = storeToRefs(useAuthStore())
  emptyDrawerAndPopup()
  const containsAdmin = computed(() => to.path.includes('admin'))
  if (to.meta.whiteList) {
    return next()
  }
  if (to.meta.auth && !isLoggedIn.value) {
    return next({ name: 'Home' })
  }
  if (isLoggedIn.value && to.path === '/login') {
    return next({ name: 'Home' })
  }
  if ((role.value === 'USER' || role.value === 'DOCTOR') && containsAdmin.value) {
    ElMessage.error('Bạn không có quyền truy cập vào trang này')
    return next({ name: 'Home' })
  }

  next()
})

export default router
