import type { RouteRecordRaw } from 'vue-router'

const TheLayout = () => import('@/components/layout/TheLayout.vue')

const AuthRouter: RouteRecordRaw[] = [
  {
    path: '/login',
    component: TheLayout,
    children: [
      {
        path: '',
        component: () => import('../view/LoginView.vue'),
        meta: {
          auth: false
        },
        name: 'Login'
      }
    ]
  },
  {
    path: '/signup',
    component: TheLayout,
    children: [
      {
        path: '',
        component: () => import('../view/SignUpView.vue'),
        meta: {
          auth: false
        },
        name: 'SignUp'
      }
    ]
  }
]

export default AuthRouter
