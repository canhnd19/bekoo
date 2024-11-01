import type { RouteRecordRaw } from 'vue-router'

const TheLayout = () => import('@/components/layout/TheLayout.vue')

const PatientRouter: RouteRecordRaw[] = [
  {
    path: '/booking-history',
    component: TheLayout,
    children: [
      {
        path: ':id',
        component: () => import('../view/BookingHistoryView.vue'),
        meta: {
          auth: true
        },
        name: 'BookingHistory'
      }
    ]
  }
]

export default PatientRouter
