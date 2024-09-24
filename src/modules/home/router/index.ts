import type { RouteRecordRaw } from 'vue-router'

const TheLayout = () => import('@/components/layout/TheLayout.vue')

const HomeRouter: RouteRecordRaw[] = [
  {
    path: '/',
    component: TheLayout,
    children: [
      {
        path: '',
        component: () => import('../view/HomeView.vue'),
        meta: {
          auth: false
        },
        name: 'Home'
      }
    ]
  }
]

export default HomeRouter
