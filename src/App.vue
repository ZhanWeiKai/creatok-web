<template>
  <div id="app">
    <!-- Header Navigation -->
    <Header />

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Router outlet will be configured here in Task 7 -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Header from './components/common/Header.vue'
</script>

<style>
/* Global app styles are imported in main.js from global.css */
</style>
