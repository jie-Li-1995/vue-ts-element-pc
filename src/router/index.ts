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
    children: [
      {
        path: 'contentManagement',
        name: 'contentManagement',
        component: () => import('@/views/content/Columns.vue'),
        children: [
          {
            path: ':id',
            name: 'column',
            component: () => import('@/views/content/Column.vue')
          },
          {
            path: ':id/article/:id',
            name: 'article',
            component: () => import('@/views/content/Article.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
