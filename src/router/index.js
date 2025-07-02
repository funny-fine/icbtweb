import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import UploadPage from '@/views/UploadPage.vue'
import DataManagementPage from '@/views/DataManagementPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: '机场疏散系统 - 首页' }
  },
  {
    path: '/upload',
    name: 'Upload',
    component: UploadPage,
    meta: { title: '机场疏散系统 - 数据上传' }
  },
  {
    path: '/data',
    name: 'DataManagement',
    component: DataManagementPage,
    meta: { title: '机场疏散系统 - 数据管理' }
  },
  // 其他路由...
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '机场疏散可视化系统'
  next()
})

export default router