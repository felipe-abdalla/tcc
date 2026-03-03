/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/pages/AuthPage.vue'
import LoginCard from '@/components/auth/LoginCard.vue'
import RegisterCard from '@/components/auth/RegisterCard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: AuthPage,
      children: [
        {
          path: '',
          name: 'login',
          component: LoginCard,
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterCard,
        },
      ],
    }
  ],
})

export default router
