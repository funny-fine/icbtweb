<template>
  <div class="home-page">
    <!-- 使用全局导航栏组件 -->
    <NavBar />

    <!-- 轮播大屏 -->
    <section class="hero-slider">
      <div class="slides">
        <div
            v-for="(slide, index) in slides"
            :key="index"
            class="slide"
            :class="{ active: currentSlide === index }"
        >
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <h1>{{ slide.title }}</h1>
            <p>{{ slide.description }}</p>
            <!-- 修改为路由链接 -->
            <router-link :to="slide.link" class="slide-btn">{{ slide.buttonText }} <i :class="slide.icon"></i></router-link>
          </div>
        </div>
      </div>
      <div class="slider-indicators">
        <div
            v-for="(indicator, index) in slides"
            :key="index"
            class="indicator"
            :class="{ active: currentSlide === index }"
            @click="showSlide(index)"
        ></div>
      </div>
    </section>

    <!-- 功能卡片区域 -->
    <section class="features">
      <div class="section-title">
        <h2>系统核心功能</h2>
        <p>一站式解决机场疏散规划、仿真与优化问题</p>
      </div>

      <div class="features-grid">
        <FeatureCard
            v-for="(feature, index) in features"
            :key="index"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
            :buttonText="feature.buttonText"
            :buttonIcon="feature.buttonIcon"
            :link="feature.link"
        />
      </div>
    </section>

  </div>
</template>

<script>
import FeatureCard from './FeatureCard.vue'
import NavBar from './NavBar.vue'

export default {
  name: 'HomePage',
  components: {
    FeatureCard,
    NavBar
  },
  data() {
    return {
      currentSlide: 0,
      slides: [
        {
          title: '机场智能疏散可视化系统',
          description: '基于多模式交通的机场大规模旅客疏散仿真与优化平台',
          buttonText: '开始使用',
          icon: 'fas fa-arrow-right',
          link: '/upload'  // 链接到上传页
        },
        {
          title: '多源数据融合分析',
          description: '支持GeoJSON路网、旅客分布矩阵、运力资源数据的一体化管理',
          buttonText: '数据管理',
          icon: 'fas fa-database',
          link: '/data'
        },
        {
          title: '智能疏散方案优化',
          description: '基于IRLGA算法的多模式交通协同疏散策略与效果评估',
          buttonText: '性能分析',
          icon: 'fas fa-cogs',
          link: '/analysis'
        }
      ],
      features: [
        {
          icon: 'fas fa-database',
          title: '数据管理',
          description: '支持多源数据上传与预处理：地图数据(GeoJSON)、旅客分布矩阵(CSV)、运力资源数据等。自动校验数据合法性，提供数据可视化展示。',
          buttonText: '进入模块',
          buttonIcon: 'fas fa-arrow-right',
          link: '/data'
        },
        {
          icon: 'fas fa-file-pdf',
          title: '方案输出',
          description: '生成可定制化疏散方案，包括车辆调度表、路径规划图等。支持PDF格式导出，便于方案汇报与实施。',
          buttonText: '导出方案',
          buttonIcon: 'fas fa-download',
          link: '/data'
        },
        {
          icon: 'fas fa-chart-line',
          title: '性能分析',
          description: '算法性能对比分析：传统GA算法与IRLGA算法效率对比。疏散效果多维度评估：候车时间、总成本等核心指标可视化分析。',
          buttonText: '查看分析',
          buttonIcon: 'fas fa-chart-bar',
          link: '/data'
        }
      ]
    }
  },
  mounted() {
    this.startAutoSlide();
    this.addDynamicBackgrounds();
  },
  methods: {
    showSlide(index) {
      this.currentSlide = index;
    },
    startAutoSlide() {
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }, 5000);
    },
    addDynamicBackgrounds() {
      const slides = document.querySelectorAll('.slide');
      if (slides.length >= 3) {
        slides[0].style.backgroundImage = "url('airport.jpg')";
        slides[1].style.backgroundImage = "url('database.jpg')";
        slides[2].style.backgroundImage = "url('algorithm.jpg')";
      }
    }
  }
}
</script>

<style scoped>
/* 轮播图样式 */
.hero-slider {
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.slides {
  height: 100%;
  position: relative;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide.active {
  opacity: 1;
}

.slide-content {
  text-align: center;
  max-width: 900px;
  padding: 0 2rem;
  z-index: 2;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 25, 41, 0.7);
}

.slide h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 1s ease;
}

.slide p {
  font-size: 1.5rem;
  max-width: 700px;
  margin: 0 auto 2rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  animation: fadeInUp 1.2s ease;
}

.slide-btn {
  display: inline-block;
  background: var(--primary);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.4);
  border: 2px solid transparent;
  animation: fadeInUp 1.4s ease;
}

.slide-btn:hover {
  background: transparent;
  border-color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(26, 115, 232, 0.6);
}

/* 功能卡片区域 */
.features {
  padding: 5rem 5%;
  background: rgba(13, 30, 50, 0.5);
}

.section-title {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--secondary);
}

.section-title p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.8);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* 轮播指示器 */
.slider-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: var(--secondary);
  transform: scale(1.2);
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .slide h1 {
    font-size: 2.8rem;
  }

  .slide p {
    font-size: 1.3rem;
  }
}

@media (max-width: 768px) {
  .slide h1 {
    font-size: 2.2rem;
  }

  .slide p {
    font-size: 1.1rem;
  }

  .slide-btn {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }

  .section-title h2 {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .slide h1 {
    font-size: 1.8rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>