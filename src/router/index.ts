import { createRouter, createWebHistory } from 'vue-router'
import LayoutBasic from '@/layouts/LayoutBasic.vue'

const routes = [
  {
    path: '/',
    component: LayoutBasic,
    meta: { requiresAuth: false, redirectIfAuthenticated: true },
    children: [
      {
        path: '/',
        component: () => import('@/views/HomePage.vue'),
        meta: {
          title: 'Weather',
        },
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
})

export default router
