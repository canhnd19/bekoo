import type { RouteRecordRaw } from 'vue-router'

const TheLayout = () => import('@/components/layout/TheLayout.vue')

const DepartmentDetailRouter: RouteRecordRaw[] = [
  {
    path: '/department-detail',
    component: TheLayout,
    children: [
      {
        path: ':id',
        component: () => import('../view/DepartmentDetailView.vue'),
        meta: {
          auth: false
        },
        name: 'DepartmentDetail'
      }
    ]
  }
]

export default DepartmentDetailRouter
