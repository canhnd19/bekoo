import listRouter from '@/modules'
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useBaseStore } from '@/stores/base'

const router = createRouter({
  linkActiveClass: 'text-active',
  linkExactActiveClass: 'text-active',
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
  const { isLogin } = storeToRefs(useAuthStore())
  emptyDrawerAndPopup()
  if (to.meta.whiteList) {
    return next()
  }
  if (to.path === '/login' && isLogin) {
    next({ name: 'Home' })
    return
  }
  next()
})

export default router
