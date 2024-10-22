import type { RouteRecordRaw } from 'vue-router'

const AdminView = () => import('../view/AdminView.vue')
const AdminRouter: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminView,
    name: 'Admin',
    children: [
      {
        path: 'users',
        component: () => import('../view/UserView.vue'),
        meta: {
          auth: false
        },
        name: 'Users'
      },
      {
        path: 'doctors',
        component: () => import('../view/DoctorView.vue'),
        meta: {
          auth: false
        },
        name: 'Doctors'
      },
      {
        path: 'departments',
        component: () => import('../view/DepartmentView.vue'),
        meta: {
          auth: false
        },
        name: 'Departments'
      }
    ]
  }
]

export default AdminRouter
