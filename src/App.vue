<template>
  <div id="app">
    <!-- 路由视图容器 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

:root {
  --primary: #1a73e8;
  --primary-dark: #0d47a1;
  --secondary: #00bcd4;
  --dark: #0a1929;
  --light: #f8f9fa;
  --gray: #5f6368;
  --success: #4caf50;
  --warning: #ff9800;
  --danger: #f44336;
}

body {
  background: linear-gradient(135deg, var(--dark), #0c1e35);
  color: var(--light);
  overflow-x: hidden;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>