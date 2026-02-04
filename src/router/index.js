import { createRouter, createWebHistory } from 'vue-router'
import VideoDetail from '../views/VideoDetail.vue'
import CreatePage from '../views/CreatePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/video/1' // 临时重定向
  },
  {
    path: '/video/:id',
    name: 'VideoDetail',
    component: VideoDetail,
    props: true
  },
  {
    path: '/create',
    name: 'CreatePage',
    component: CreatePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
