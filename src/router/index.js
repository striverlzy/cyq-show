import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      meta: { title: '主页' , requiresAuth: true},
      component: () => import('@/pages/main/index')
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('@/pages/login/login.vue')
    },
    {
      path: '/qa',
      name: '问答',
      meta: { title: '问答' , requiresAuth: true},
      component: () => import('@/pages/qa/index.vue')
    },
    {
      path: '/articleDetail',
      name: '详情',
      meta: { title: '文章详情' , requiresAuth: true},
      component: () => import('@/pages/article/detail.vue')
    },
    {
      path: '/add',
      name: '发布',
      meta: { title: '发布' , requiresAuth: true},
      component: () => import('@/pages/article/submit.vue')
    },
    {
      path: '/gathering',
      name: '活动',
      component: () => import('@/pages/gathering/index.vue')
    },
    {
      path: '/gathering/detail',
      name: '活动',
      component: () => import('@/pages/gathering/gatheringDetail.vue')
    },
    {
      path: '/transaction',
      name: '车务',
      component: () => import('@/pages/transaction/index.vue')
    },
    {
      path: '/person',
      name: '个人信息',
      component: () => import('@/pages/person/index.vue')
    }
  ]
})
