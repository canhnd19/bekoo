import type { RouteRecordRaw } from 'vue-router'

import HomeRouter from './home/router'

const listRouter: RouteRecordRaw[][] = [HomeRouter]

export default listRouter.flat()
