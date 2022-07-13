import { createRouter, createWebHashHistory, RouteLocationNormalized } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { App } from 'vue'
import routerMap from './routerMap'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...routerMap as RouteRecordRaw[]
  ]
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
  NProgress.start()
  next()
})

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  NProgress.done()
})

router.onError((error: any) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed: boolean = error.message.match(pattern)
  if (isChunkLoadFailed) {
    location.reload()
  }
})

const VueRouterPush = router.push as any
router.push = function push (to: any) {
  return VueRouterPush.call(this, to).catch((err: any) => err)
}

const registerRouter = (app: App): void => {
  app.use(router)
}

export { router as default, router, registerRouter }
