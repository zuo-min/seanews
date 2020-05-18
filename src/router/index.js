import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    redirect: '/welcome', // 路由重定向
    children: [
      { path: '/welcome', name: 'welcome', component: () => import('@/views/welcome') },
      { path: '/news', name: 'news', component: () => import('@/views/news') },
      { path: '/newsadd', name: 'newsadd', component: () => import('@/views/newsadd') },
      { path: '/newsedit/:aid', name: 'newsedit', component: () => import('@/views/newsedit') }, // 路由跳转需要传参
      {
        path: '/account',
        name: 'account',
        component: () => import('@/views/account/account')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 设置路由守卫
router.beforeEach((to, from, next) => {
  var userInfo = window.sessionStorage.getItem('userInfo')
  if (!userInfo && to.path !== '/login') {
    return next('/login')
  }
  next()
})

export default router
