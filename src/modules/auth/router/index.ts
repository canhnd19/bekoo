import type { RouteRecordRaw } from 'vue-router'

const TheLayout = () => import('@/components/layout/TheLayout.vue')

const AuthRouter: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('../view/LoginView.vue'),
    meta: {
      auth: false
    },
    name: 'Login'
  },
  {
    path: '/signup',
    component: () => import('../view/SignUpView.vue'),
    meta: {
      auth: false
    },
    name: 'SignUp'
  },
  {
    path: '/forgot-pasword',
    component: () => import('../view/ForgotPasswordView.vue'),
    meta: {
      auth: false
    },
    name: 'ForgotPassword'
  },
  {
    path: '/pin-code',
    component: () => import('../view/PinCodeView.vue'),
    meta: {
      auth: false
    },
    name: 'PinCode'
  },
  {
    path: '/new-password',
    component: () => import('../view/SetNewPasswordView.vue'),
    meta: {
      auth: false
    },
    name: 'SetNewPassword'
  },
  {
    path: '/change-password',
    component: () => import('../view/ChangePasswordView.vue'),
    meta: {
      auth: false
    },
    name: 'ChangePassword'
  },
  {
    path: '/edit-user',
    component: () => import('../view/EditUserView.vue'),
    meta: {
      auth: false
    },
    name: 'EditUser'
  },
  {
    path: '/medical-record',
    component: TheLayout,
    children: [
      {
        path: ':id',
        component: () => import('../view/MedicalRecordView.vue'),
        meta: {
          auth: true
        },
        name: 'MedicalRecord'
      }
    ]
  }
]

export default AuthRouter
