import { createRouter, createWebHistory } from 'vue-router'
import MovieView from '@/views/MovieView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movie',
      component: MovieView,
    },
  ],
})

export default router
