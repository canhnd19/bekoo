import type { RouteRecordRaw } from 'vue-router'

const TheLayout = () => import('@/components/layout/TheLayout.vue')

const BookingRouter: RouteRecordRaw[] = [
  {
    path: '/booking',
    component: TheLayout,
    children: [
      {
        path: ':id',
        component: () => import('../view/BookingView.vue'),
        meta: {
          auth: false
        },
        name: 'Booking'
      }
    ]
  }
]

export default BookingRouter
