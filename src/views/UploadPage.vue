<template>
  <div class="upload-page">
    <!-- 使用全局导航栏组件 -->
    <NavBar />

    <div class="upload-container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1><i class="fas fa-cloud-upload-alt"></i> 数据上传中心</h1>
        <p>请上传机场疏散系统所需的三种核心数据文件</p>
      </div>

      <!-- 上传区域 -->
      <div class="upload-grid">
        <!-- 地图数据上传 -->
        <div class="upload-card">
          <div class="card-header">
            <i class="fas fa-map-marked-alt"></i>
            <h2>地图数据</h2>
            <span class="required-tag">必填</span>
          </div>

          <div class="card-content">
            <div class="format-info">
              <h3>支持格式：</h3>
              <p>GeoJSON 或 CSV</p>
              <p class="hint">文件应包含路网信息及机场/中转站坐标</p>
            </div>

            <div class="example-preview">
              <h3>数据结构示例：</h3>
              <div class="preview-box">
                <pre>{{ mapExample }}</pre>
              </div>
            </div>

            <div class="upload-area" @dragover.prevent @drop="onDrop('map', $event)">
              <div v-if="!mapFile" class="upload-prompt">
                <i class="fas fa-cloud-upload-alt"></i>
                <p>拖放文件到此处或</p>
                <input type="file" id="map-upload" @change="onFileChange('map', $event)" hidden>
                <label for="map-upload" class="upload-btn">选择文件</label>
                <p class="support-text">支持 .geojson, .json, .csv 格式</p>
              </div>
              <div v-else class="file-info">
                <i class="fas fa-file-alt"></i>
                <div class="file-details">
                  <p class="file-name">{{ mapFile.name }}</p>
                  <p class="file-size">{{ formatFileSize(mapFile.size) }}</p>
                </div>
                <button class="remove-btn" @click="removeFile('map')">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div class="validation-status">
              <div v-if="mapValidation" :class="['status-badge', mapValidation.valid ? 'valid' : 'invalid']">
                <i :class="mapValidation.valid ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
                {{ mapValidation.message }}
              </div>
            </div>
          </div>
        </div>

        <!-- 需求数据上传 -->
        <div class="upload-card">
          <div class="card-header">
            <i class="fas fa-users"></i>
            <h2>需求数据</h2>
            <span class="required-tag">必填</span>
          </div>

          <div class="card-content">
            <div class="format-info">
              <h3>支持格式：</h3>
              <p>CSV</p>
              <p class="hint">旅客时空分布矩阵</p>
            </div>

            <div class="example-preview">
              <h3>数据结构示例：</h3>
              <div class="preview-box">
                <pre>{{ demandExample }}</pre>
              </div>
            </div>

            <div class="upload-area" @dragover.prevent @drop="onDrop('demand', $event)">
              <div v-if="!demandFile" class="upload-prompt">
                <i class="fas fa-cloud-upload-alt"></i>
                <p>拖放文件到此处或</p>
                <input type="file" id="demand-upload" @change="onFileChange('demand', $event)" hidden>
                <label for="demand-upload" class="upload-btn">选择文件</label>
                <p class="support-text">支持 .csv 格式</p>
              </div>
              <div v-else class="file-info">
                <i class="fas fa-file-alt"></i>
                <div class="file-details">
                  <p class="file-name">{{ demandFile.name }}</p>
                  <p class="file-size">{{ formatFileSize(demandFile.size) }}</p>
                </div>
                <button class="remove-btn" @click="removeFile('demand')">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div class="validation-status">
              <div v-if="demandValidation" :class="['status-badge', demandValidation.valid ? 'valid' : 'invalid']">
                <i :class="demandValidation.valid ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
                {{ demandValidation.message }}
              </div>
            </div>
          </div>
        </div>

        <!-- 运力数据上传 -->
        <div class="upload-card">
          <div class="card-header">
            <i class="fas fa-bus"></i>
            <h2>运力数据</h2>
            <span class="required-tag">必填</span>
          </div>

          <div class="card-content">
            <div class="format-info">
              <h3>支持格式：</h3>
              <p>CSV</p>
              <p class="hint">出租车与巴士车队信息</p>
            </div>

            <div class="example-preview">
              <h3>数据结构示例：</h3>
              <div class="preview-box">
                <pre>{{ capacityExample }}</pre>
              </div>
            </div>

            <div class="upload-area" @dragover.prevent @drop="onDrop('capacity', $event)">
              <div v-if="!capacityFile" class="upload-prompt">
                <i class="fas fa-cloud-upload-alt"></i>
                <p>拖放文件到此处或</p>
                <input type="file" id="capacity-upload" @change="onFileChange('capacity', $event)" hidden>
                <label for="capacity-upload" class="upload-btn">选择文件</label>
                <p class="support-text">支持 .csv 格式</p>
              </div>
              <div v-else class="file-info">
                <i class="fas fa-file-alt"></i>
                <div class="file-details">
                  <p class="file-name">{{ capacityFile.name }}</p>
                  <p class="file-size">{{ formatFileSize(capacityFile.size) }}</p>
                </div>
                <button class="remove-btn" @click="removeFile('capacity')">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div class="validation-status">
              <div v-if="capacityValidation" :class="['status-badge', capacityValidation.valid ? 'valid' : 'invalid']">
                <i :class="capacityValidation.valid ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
                {{ capacityValidation.message }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button class="validate-btn" @click="validateFiles" :disabled="!allFilesUploaded">
          <i class="fas fa-check-circle"></i> 校验数据
        </button>
        <button class="submit-btn" :disabled="!allFilesValid" @click="submitFiles">
          <i class="fas fa-paper-plane"></i> 提交数据
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'UploadPage',
  components: {
    NavBar
  },
  data() {
    return {
      mapFile: null,
      demandFile: null,
      capacityFile: null,
      mapValidation: null,
      demandValidation: null,
      capacityValidation: null,
      mapExample: `路网数据-待定`,
      demandExample: `需求数据-待定`,
      capacityExample: `运力数据-待定`
    };
  },
  computed: {
    allFilesUploaded() {
      return this.mapFile && this.demandFile && this.capacityFile;
    },
    allFilesValid() {
      return (
          this.mapValidation?.valid &&
          this.demandValidation?.valid &&
          this.capacityValidation?.valid
      );
    }
  },
  methods: {
    onDrop(type, event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length) {
        this.handleFile(type, files[0]);
      }
    },

    onFileChange(type, event) {
      const files = event.target.files;
      if (files.length) {
        this.handleFile(type, files[0]);
      }
    },

    handleFile(type, file) {
      // 根据类型设置文件
      if (type === 'map') {
        this.mapFile = file;
        this.mapValidation = null;
      } else if (type === 'demand') {
        this.demandFile = file;
        this.demandValidation = null;
      } else if (type === 'capacity') {
        this.capacityFile = file;
        this.capacityValidation = null;
      }
    },

    removeFile(type) {
      if (type === 'map') {
        this.mapFile = null;
        this.mapValidation = null;
      } else if (type === 'demand') {
        this.demandFile = null;
        this.demandValidation = null;
      } else if (type === 'capacity') {
        this.capacityFile = null;
        this.capacityValidation = null;
      }
    },

    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    validateFiles() {
      // 这里应该是实际的后端校验，这里模拟校验过程
      this.mapValidation = {
        valid: true,
        message: "地图数据校验通过：包含2个机场区域，5个中转站"
      };

      this.demandValidation = {
        valid: true,
        message: "需求数据校验通过：检测到1245名旅客，分布在3个区域"
      };

      this.capacityValidation = {
        valid: true,
        message: "运力数据校验通过：包含30辆出租车，8辆巴士"
      };

      // 模拟可能的错误情况
      // this.mapValidation = {
      //   valid: false,
      //   message: "错误：缺少必需的机场坐标信息"
      // };
    },

    submitFiles() {
      // 这里应该是实际的文件提交逻辑
      this.$notify({
        title: '数据提交成功',
        message: '所有数据已成功上传并验证通过，可以开始疏散仿真',
        type: 'success'
      });

      // 3秒后跳转到仿真页面
      setTimeout(() => {
        this.$router.push('/simulation');
      }, 3000);
    }
  }
};
</script>

<style scoped>
.upload-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a1929, #0c1e35);
  color: #f8f9fa;
}

.upload-container {
  max-width: 1400px;
  margin: 100px auto 50px;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
  padding-top: 20px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #00bcd4;
}

.page-header h1 i {
  margin-right: 15px;
}

.page-header p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin: 0 auto;
}

.upload-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.upload-card {
  background: rgba(20, 40, 60, 0.7);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(41, 121, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.upload-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(26, 115, 232, 0.3);
}

.card-header {
  background: rgba(26, 115, 232, 0.2);
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(41, 121, 255, 0.2);
}

.card-header i {
  font-size: 1.8rem;
  color: #00bcd4;
  margin-right: 15px;
}

.card-header h2 {
  font-size: 1.6rem;
  margin: 0;
}

/* 修改必填标签样式 */
.required-tag {
  background: rgba(200, 70, 70, 0.3); /* 更柔和的红色 */
  color: #ffa8a8; /* 更柔和的文字颜色 */
  border: 1px solid rgba(220, 100, 100, 0.5); /* 添加边框 */
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 4px;
  margin-left: 10px;
  backdrop-filter: blur(5px); /* 添加模糊效果 */
}

.card-content {
  padding: 20px;
}

.format-info {
  margin-bottom: 20px;
}

.format-info h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #00bcd4;
}

.format-info p {
  margin: 5px 0;
}

.hint {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.example-preview {
  margin-bottom: 20px;
}

.example-preview h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #00bcd4;
}

.preview-box {
  background: rgba(10, 25, 41, 0.8);
  border-radius: 8px;
  padding: 15px;
  max-height: 200px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #a3daff;
}

.upload-area {
  border: 2px dashed rgba(41, 121, 255, 0.3);
  border-radius: 10px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.upload-area:hover {
  border-color: #1a73e8;
  background: rgba(26, 115, 232, 0.1);
}

.upload-prompt i {
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 15px;
}

.upload-prompt p {
  margin: 10px 0;
}

.upload-btn {
  display: inline-block;
  background: #1a73e8;
  color: white;
  padding: 8px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  margin-top: 10px;
}

.upload-btn:hover {
  background: #0d47a1;
  transform: translateY(-2px);
}

.support-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 15px;
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: rgba(10, 25, 41, 0.5);
  border-radius: 8px;
}

.file-info i {
  font-size: 1.5rem;
  color: #00bcd4;
  margin-right: 15px;
}

.file-details {
  flex: 1;
  text-align: left;
}

.file-name {
  font-weight: 500;
  margin-bottom: 5px;
  word-break: break-all;
}

.file-size {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.remove-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: #f44336;
}

.validation-status {
  min-height: 40px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 50px;
  font-size: 0.95rem;
  margin-top: 10px;
}

.status-badge i {
  margin-right: 8px;
}

.status-badge.valid {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.4);
}

.status-badge.invalid {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.4);
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
}

.validate-btn, .submit-btn {
  padding: 12px 35px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  border: none;
}

.validate-btn i, .submit-btn i {
  margin-right: 10px;
}

.validate-btn {
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.4);
}

.validate-btn:hover:not(:disabled) {
  background: rgba(255, 152, 0, 0.3);
  transform: translateY(-3px);
}

.validate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-btn {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.4);
}

.submit-btn:hover:not(:disabled) {
  background: rgba(76, 175, 80, 0.3);
  transform: translateY(-3px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .upload-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .upload-container {
    margin-top: 80px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 15px;
  }

  .validate-btn, .submit-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .upload-card {
    margin-bottom: 20px;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }

  .page-header p {
    font-size: 1rem;
  }
}
</style>