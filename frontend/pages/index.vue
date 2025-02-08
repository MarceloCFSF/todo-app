<template>
  <v-container class="fill-height justify-center flex-column fluid">
    <h1>HOME</h1>
    <v-btn @click="logout">Logout</v-btn>
  </v-container>
</template>

<script setup>
  import { useAuthStore } from '@/stores/auth';

  const authStore = useAuthStore();

  async function logout() {
    await authStore.logout();
    navigateTo('/login');
  }
</script>