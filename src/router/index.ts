import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '@/views/HomePage.view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePageView
    }
  ]
})

export default router
