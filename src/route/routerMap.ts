
export default [
  {
    path: '/',
    name: 'hello',
    component: async () => await import(/* webpackChunkName: "404" */ '@/views/hello.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: async () => await import(/* webpackChunkName: "404" */ '@/views/404.vue')
  }
]
