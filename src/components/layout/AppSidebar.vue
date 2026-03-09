<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { navigation } from '@/config/navigation'

const router = useRouter()
const route = useRoute()

const user = ref({
    name: 'Felipe Souza',
    email: 'felipe@email.com'
})

function logout() {
    console.log("Logging out")
    router.push('/auth')
}
</script>

<template>
  <v-navigation-drawer
    permanent
    width="260"
  >
    <div class="sidebar-container">

      <!-- Logo -->
      <div class="logo-section">
        <v-img
          src="@/assets/logo.png"
          max-height="80"
          contain
        />
      </div>

      <!-- Navigation -->
      <v-list nav>
        <v-list-item
          v-for="item in navigation"
          :key="item.route"
          :to="item.route"
          link
        >
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>

          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <!-- Push bottom content down -->
      <v-spacer />

      <!-- Profile -->
      <v-divider />

      <v-list-item>
        <template #prepend>
          <v-avatar size="36">
            <v-icon>mdi-account</v-icon>
          </v-avatar>
        </template>

        <v-list-item-title>{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
      </v-list-item>

      <!-- Logout -->
      <v-list-item link>
        <template #prepend>
          <v-icon color="error">mdi-logout</v-icon>
        </template>

        <v-list-item-title class="text-error" @click="logout">
          Logout
        </v-list-item-title>
      </v-list-item>

    </div>
  </v-navigation-drawer>
</template>

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.logo-section {
  padding: 16px;
}
</style>