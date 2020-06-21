import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/content',
    name: 'content',
    component: () => import('@/views/layout/Index.vue'),
    redirect: { name: 'ViewTemplate' },
    children: [
      {
        path: 'SystemSetting',
        name: 'SystemSetting',
        component: () => import('@/views/SystemSetting.vue')
      },
      {
        path: 'EmailSetting',
        name: 'EmailSetting',
        component: () => import('@/views/EmailSetting.vue')
      },
      {
        path: 'DictionaryManagement',
        name: 'DictionaryManagement',
        component: () => import('@/views/DictionaryManagement.vue')
      },
      {
        path: 'LoginLog',
        name: 'LoginLog',
        component: () => import('@/views/LoginLog.vue')
      },
      {
        path: 'VersionManagement',
        name: 'VersionManagement',
        component: () => import('@/views/VersionManagement.vue')
      },
      {
        path: 'ViewTemplate',
        name: 'ViewTemplate',
        component: () => import('@/views/ViewTemplate.vue')
      },
      {
        path: 'ColumnManagement',
        name: 'ColumnManagement',
        component: () => import('@/views/ColumnManagement.vue')
      },
      {
        path: 'Announcement',
        name: 'Announcement',
        component: () => import('@/views/Announcement.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
