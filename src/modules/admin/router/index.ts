import type { RouteRecordRaw } from 'vue-router'

const AdminView = () => import('../view/AdminView.vue')
const AdminRouter: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminView,
    name: 'Admin',
    children: [
      {
        path: 'reports',
        component: () => import('../view/ReportView.vue'),
        meta: {
          auth: true
        },
        name: 'Reports'
      },
      {
        path: 'users',
        component: () => import('../view/UserView.vue'),
        meta: {
          auth: true
        },
        name: 'Users'
      },
      {
        path: 'doctors',
        component: () => import('../view/DoctorView.vue'),
        meta: {
          auth: true
        },
        name: 'Doctors'
      },
      {
        path: 'departments',
        component: () => import('../view/DepartmentView.vue'),
        meta: {
          auth: true
        },
        name: 'Departments'
      }
    ]
  },
  {
    path: '/doctor',
    component: AdminView,
    children: [
      {
        path: ':id',
        component: () => import('../view/MedicalScheduleView.vue'),
        meta: {
          auth: true
        },
        name: 'MedicalSchedule'
      }
    ]
  }
]

export default AdminRouter
