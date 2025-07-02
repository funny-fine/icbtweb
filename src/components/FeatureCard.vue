<template>
  <div class="feature-card" @mouseenter="hover = true" @mouseleave="hover = false">
    <div class="card-icon">
      <i :class="icon"></i>
    </div>
    <div class="card-content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <router-link :to="link" class="card-btn">{{ buttonText }} <i :class="buttonIcon"></i></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
  props: {
    icon: String,
    title: String,
    description: String,
    buttonText: String,
    buttonIcon: String,
    link: String
  },
  data() {
    return {
      hover: false
    }
  }
}
</script>

<style scoped>
.feature-card {
  background: rgba(20, 40, 60, 0.7);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.4s ease;
  border: 1px solid rgba(41, 121, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary);
  box-shadow: 0 15px 40px rgba(26, 115, 232, 0.3);
}

.card-icon {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 115, 232, 0.1);
}

.card-icon i {
  font-size: 5rem;
  color: var(--secondary);
}

.card-content {
  padding: 2rem;
}

.card-content h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--light);
}

.card-content p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

.card-btn {
  display: inline-block;
  padding: 0.8rem 1.8rem;
  background: transparent;
  color: var(--secondary);
  border: 2px solid var(--secondary);
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.card-btn:hover {
  background: var(--secondary);
  color: var(--dark);
}
</style>