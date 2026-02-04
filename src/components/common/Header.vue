<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Logo -->
      <div class="logo">
        <router-link to="/">
          <span class="logo-text">CreatOK</span>
        </router-link>
      </div>

      <!-- Navigation Menu -->
      <nav class="nav-menu">
        <el-menu mode="horizontal" :default-active="activeMenu" class="nav-menu-inner">
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="features">功能</el-menu-item>
          <el-menu-item index="faq">常见问题</el-menu-item>
          <el-menu-item index="sora2">Sora 2</el-menu-item>
          <el-menu-item index="tools">工具</el-menu-item>
          <el-menu-item index="pricing">价格</el-menu-item>
        </el-menu>
      </nav>

      <!-- Right Actions Area -->
      <div class="header-actions">
        <el-button text class="lang-btn">中文</el-button>
        <el-button v-if="!isLoggedIn" @click="handleLogin">登录</el-button>
        <el-button v-if="!isLoggedIn" type="primary" @click="handleRegister">注册</el-button>
        <div v-else class="user-avatar">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-icon><User /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>工作台</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const activeMenu = ref('home')
const isLoggedIn = ref(false) // Simulate login state

const handleLogin = () => {
  // Simulate login functionality
  ElMessage.info('登录功能开发中...')
}

const handleRegister = () => {
  // Simulate register functionality
  ElMessage.info('注册功能开发中...')
}
</script>

<style scoped>
/* Component uses global styles from global.css */
/* Additional component-specific styles can be added here if needed */
</style>
