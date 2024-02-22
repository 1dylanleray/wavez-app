import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/library',
      component: () => import('../views/LibraryView.vue')
    },
  ]
})

export default router
