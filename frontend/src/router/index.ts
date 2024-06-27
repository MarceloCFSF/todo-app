import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from '@/views/HomeView.vue';
import { useAuthStore } from '@/stores/auth';
import routeNames from './routeNames';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: routeNames.home,
      component: HomeView
    },
    {
      path: '/login',
      name: routeNames.login,
      component: LoginView
    }
  ]
})

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore()

  if (to.name !== routeNames.login && !authStore.token) {
    next({ name: routeNames.login })
  } else if (to.name === routeNames.login && authStore.token) {
    next({ name: routeNames.home })
  } else {
    next()
  }
})

export default router
