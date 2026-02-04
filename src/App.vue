<template>
  <div id="app">
    <!-- Header Navigation -->
    <Header />

    <!-- Router outlet will render the page content -->
    <router-view />
  </div>
</template>

<script setup>
import Header from './components/common/Header.vue'
</script>

<style>
/* Global app styles are imported in main.js from global.css */
</style>
