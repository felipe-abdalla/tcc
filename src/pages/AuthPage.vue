<script setup>
import LoginBrandingPanel from '@/components/auth/LoginBrandingPanel.vue'
</script>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row class="fill-height ma-0">

      <!-- LEFT PANEL -->
      <v-col
        cols="12"
        md="8"
        class="d-flex align-center justify-center branding-panel"
      >
        <LoginBrandingPanel />
      </v-col>

      <!-- RIGHT PANEL -->
      <v-col
        cols="12"
        md="4"
        class="d-flex align-center justify-center"
      >
        <router-view v-slot="{ Component }">
          <transition name="card-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-col>

    </v-row>
  </v-container>
</template>

<style scoped>
.branding-panel {
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)),
    rgb(var(--v-theme-secondary))
  );
}

.card-slide-enter-active,
.card-slide-leave-active {
  transition: all 0.3s ease;
}

.card-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.card-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>