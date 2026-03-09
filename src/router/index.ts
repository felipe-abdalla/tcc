// Composables
import { createRouter, createWebHistory } from 'vue-router'

import AuthPage from '@/pages/AuthPage.vue'
import LoginCard from '@/components/auth/LoginCard.vue'
import RegisterCard from '@/components/auth/RegisterCard.vue'

import DashboardLayout from '@/layouts/DashboardLayout.vue'

import HomePage from '@/pages/HomePage.vue'
import ProjectsPage from '@/pages/ProjectsPage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // AUTH
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
    },

    // DASHBOARD
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomePage
        },
        {
          path: 'projects',
          name: 'projects',
          component: ProjectsPage
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsPage
        }
      ]
    }
  ],
})

export default router
