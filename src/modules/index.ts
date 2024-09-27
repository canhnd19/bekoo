import type { RouteRecordRaw } from 'vue-router'

import AuthRouter from './auth/router'
import HomeRouter from './home/router'

const listRouter: RouteRecordRaw[][] = [HomeRouter, AuthRouter]

export default listRouter.flat()
