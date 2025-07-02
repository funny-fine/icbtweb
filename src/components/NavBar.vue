<template>
  <nav class="navbar">
    <div class="logo">
      <i class="fas fa-plane-departure logo-icon"></i>
      <span>机场疏散可视化系统</span>
    </div>
    <div class="nav-links">
      <router-link to="/">首页</router-link>
      <router-link to="/upload">上传数据</router-link>
      <router-link to="/data">数据管理</router-link>
      <router-link to="/analysis">性能分析</router-link>
      <router-link to="/help">帮助文档</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(10, 25, 41, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(41, 121, 255, 0.2);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--light);
}

.logo-icon {
  color: var(--secondary);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  position: relative;
}

.nav-links a:hover, 
.nav-links a.router-link-exact-active {
  color: var(--secondary);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--secondary);
  transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.router-link-exact-active::after {
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .nav-links {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 1rem;
  }
  
  .logo {
    margin-bottom: 1rem;
  }
}

@media (max-width: 576px) {
  .nav-links {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>