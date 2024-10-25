import type { RouteRecordRaw } from 'vue-router'

import AdminRouter from './admin/router'
import AuthRouter from './auth/router'
import BookingRouter from './booking/router'
import DepartmentDetailRouter from './department-detail/router'
import HomeRouter from './home/router'

const listRouter: RouteRecordRaw[][] = [HomeRouter, AuthRouter, AdminRouter, DepartmentDetailRouter, BookingRouter]

export default listRouter.flat()
