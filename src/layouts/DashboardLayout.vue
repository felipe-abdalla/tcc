<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>

<template>
  <v-layout class="fill-height">

    <AppSidebar />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

  </v-layout>
</template>