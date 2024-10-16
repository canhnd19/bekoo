import type { RouteRecordRaw } from 'vue-router'

import AdminRouter from './admin/router'
import AuthRouter from './auth/router'
import HomeRouter from './home/router'

const listRouter: RouteRecordRaw[][] = [HomeRouter, AuthRouter, AdminRouter]

export default listRouter.flat()
