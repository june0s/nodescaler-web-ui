<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark">
    <div class="navbar-nav">
      <router-link to="/" class="nav-item nav-link">Home</router-link>
      <router-link to="/cluster" class="nav-item nav-link">Cluster</router-link>
      <router-link to="/scale-out" class="nav-item nav-link"
        >Scale Out</router-link
      >
      <router-link to="/scale-in" class="nav-item nav-link"
        >Scale In</router-link
      >
      <button
        @click="authStore.logout()"
        class="btn btn-link nav-item nav-link"
      >
        Logout
      </button>
    </div>
  </nav>
</template>
