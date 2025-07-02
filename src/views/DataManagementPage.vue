<template>
  <div class="data-management-page">
    <!-- 全局导航栏 -->
    <NavBar />

    <div class="data-container">

      <div class="page-header">
        <h1><i class="fas fa-database"></i> 疏散案例数据管理中心</h1>
        <div class="search-box">
          <input
              type="text"
              v-model="searchQuery"
              placeholder="搜索案例ID、描述..."
          >
          <i class="fas fa-search"></i>
        </div>
      </div>

      <!-- 数据表格 -->
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th @click="sortBy('id')">
                案例ID
                <i :class="sortIcon('id')"></i>
              </th>
              <th @click="sortBy('name')">
                案例描述
                <i :class="sortIcon('name')"></i>
              </th>
              <th @click="sortBy('passengers')">
                旅客数量
                <i :class="sortIcon('passengers')"></i>
              </th>
              <th @click="sortBy('date')">
                上传时间
                <i :class="sortIcon('date')"></i>
              </th>
              <th @click="sortBy('status')">
                状态
                <i :class="sortIcon('status')"></i>
              </th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginatedData" :key="item.id">
              <td>{{ item.id }}</td>
              <td class="case-name">
                <i class="fas fa-file-alt"></i>
                {{ item.name }}
              </td>
              <td>{{ item.passengers }} 人</td>
              <td>{{ formatDate(item.date) }}</td>
              <td>
                <span :class="['status-badge', item.status]">
                  {{ statusText[item.status] }}
                </span>
              </td>
              <td class="actions">
                <button class="view-btn" @click="viewResults(item)">
                  <i class="fas fa-chart-bar"></i> 查看结果
                </button>
                <button class="delete-btn" @click="confirmDelete(item, index)">
                  <i class="fas fa-trash-alt"></i> 删除
                </button>
              </td>
            </tr>
            <tr v-if="filteredCases.length === 0">
              <td colspan="6" class="no-data">
                <i class="fas fa-inbox"></i>
                <p>没有找到匹配的数据</p>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 分页控件 -->
        <div class="pagination">
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <i class="fas fa-chevron-left"></i>
          </button>

          <button
            v-for="page in pages"
            :key="page"
            @click="currentPage = page"
            :class="{ active: currentPage === page }"
          >
            {{ page }}
          </button>

          <button
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 删除确认对话框 -->
    <div v-if="showDeleteDialog" class="dialog-overlay">
      <div class="delete-dialog">
        <h3>确认删除</h3>
        <p>确定要删除案例 <strong>{{ selectedCase.name }}</strong> (ID: {{ selectedCase.id }}) 吗？</p>
        <div class="dialog-actions">
          <button class="cancel-btn" @click="showDeleteDialog = false">取消</button>
          <button class="confirm-delete-btn" @click="deleteCase">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'DataManagementPage',
  components: {
    NavBar
  },
  data() {
    return {
      searchQuery: '',
      startDate: '',
      endDate: '',
      sortField: 'date',
      sortDirection: 'desc',
      currentPage: 1,
      itemsPerPage: 8,
      showDeleteDialog: false,
      selectedCase: null,
      selectedIndex: -1,
      statusText: {
        'completed': '已完成',
        'processing': '处理中',
        'pending': '待处理'
      },
      // 模拟数据 - 实际应用中应从后端API获取
      cases: [
        {
          id: 'EVAC-2023-001',
          name: '首都机场夏季高峰疏散',
          passengers: 2456,
          date: '2023-06-15T14:30:00',
          status: 'completed'
        },
        {
          id: 'EVAC-2023-002',
          name: '虹桥机场暴雨应急疏散',
          passengers: 1873,
          date: '2023-07-22T09:15:00',
          status: 'completed'
        },
        {
          id: 'EVAC-2023-003',
          name: '白云机场节假日疏散模拟',
          passengers: 3210,
          date: '2023-08-05T16:45:00',
          status: 'processing'
        },
        {
          id: 'EVAC-2023-004',
          name: '双流机场新航站楼测试',
          passengers: 1562,
          date: '2023-08-18T11:20:00',
          status: 'pending'
        },
        {
          id: 'EVAC-2023-005',
          name: '浦东机场国际航班疏散',
          passengers: 2987,
          date: '2023-09-03T13:40:00',
          status: 'completed'
        },
        {
          id: 'EVAC-2023-007',
          name: '江北机场冬季演练',
          passengers: 1890,
          date: '2023-09-20T10:05:00',
          status: 'processing'
        },
        {
          id: 'EVAC-2023-008',
          name: '长水机场多模式疏散',
          passengers: 2763,
          date: '2023-09-25T15:30:00',
          status: 'pending'
        },
        {
          id: 'EVAC-2023-009',
          name: '萧山机场高峰时段测试',
          passengers: 2105,
          date: '2023-09-28T17:20:00',
          status: 'completed'
        },
        {
          id: 'EVAC-2023-010',
          name: '天河机场紧急疏散模拟',
          passengers: 1689,
          date: '2023-10-05T08:45:00',
          status: 'processing'
        }
      ]
    }
  },
  computed: {
    // 格式化日期
    formatDate() {
      return (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    },

    // 过滤后的数据
    filteredCases() {
      let filtered = [...this.cases];

      // 搜索过滤
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(item =>
          item.id.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query)
        );
      }

      // 日期范围过滤
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        end.setDate(end.getDate() + 1); // 包括结束日期

        filtered = filtered.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= start && itemDate < end;
        });
      }

      // 排序
      return filtered.sort((a, b) => {
        let modifier = 1;
        if (this.sortDirection === 'desc') modifier = -1;

        if (a[this.sortField] < b[this.sortField]) return -1 * modifier;
        if (a[this.sortField] > b[this.sortField]) return 1 * modifier;
        return 0;
      });
    },

    // 分页数据
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCases.slice(start, end);
    },

    // 总页数
    totalPages() {
      return Math.ceil(this.filteredCases.length / this.itemsPerPage);
    },

    // 分页按钮
    pages() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    },

    // 总旅客数
    totalPassengers() {
      return this.filteredCases.reduce((sum, item) => sum + item.passengers, 0);
    },

    // 最近更新时间
    latestUpdate() {
      if (this.filteredCases.length === 0) return '暂无数据';

      const dates = this.filteredCases
        .map(item => new Date(item.date))
        .sort((a, b) => b - a);

      return this.formatDate(dates[0]);
    },

    // 排序图标
    sortIcon() {
      return (field) => {
        if (this.sortField !== field) return 'fas fa-sort';
        return this.sortDirection === 'asc'
          ? 'fas fa-sort-up'
          : 'fas fa-sort-down';
      }
    }
  },
  methods: {
    // 应用日期过滤器
    applyDateFilter() {
      this.currentPage = 1;
    },

    // 排序方法
    sortBy(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortDirection = 'asc';
      }
    },

    // 查看结果
    viewResults(item) {
      // TODO: 连接后端API获取详细结果数据
      console.log('查看结果:', item.id);
      this.$notify({
        title: '查看疏散结果',
        message: `正在加载案例 ${item.name} 的疏散结果...`,
        type: 'info'
      });

      // 模拟加载
      setTimeout(() => {
        this.$router.push(`/results/${item.id}`);
      }, 1000);
    },

    // 确认删除
    confirmDelete(item, index) {
      this.selectedCase = item;
      this.selectedIndex = index;
      this.showDeleteDialog = true;
    },

    // 删除案例
    deleteCase() {
      // TODO: 连接后端API删除数据
      console.log('删除案例:', this.selectedCase.id);

      // 从前端数组中移除
      this.cases.splice(this.selectedIndex, 1);

      this.$notify({
        title: '删除成功',
        message: `案例 ${this.selectedCase.name} 已被删除`,
        type: 'success'
      });

      this.showDeleteDialog = false;
      this.selectedCase = null;
      this.selectedIndex = -1;
    },

    // 获取数据（模拟）
    fetchData() {
      // TODO: 连接后端API获取最新数据
      this.$notify({
        title: '数据刷新',
        message: '数据已成功刷新',
        type: 'success'
      });
    }
  }
}
</script>

<style scoped>
.data-management-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a1929, #0c1e35);
  color: #f8f9fa;
}

.data-container {
  max-width: 1400px;
  margin: 100px auto 50px;
  padding: 0 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-top: 20px;
}

.page-header h1 {
  font-size: 1.8rem;
  color: #00bcd4;
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box input {
  background: rgba(20, 40, 60, 0.7);
  border: 1px solid rgba(41, 121, 255, 0.3);
  border-radius: 30px;
  padding: 10px 20px 10px 40px;
  color: white;
  width: 300px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #1a73e8;
  box-shadow: 0 0 10px rgba(26, 115, 232, 0.5);
}

.search-box i {
  position: absolute;
  left: 15px;
  color: rgba(255, 255, 255, 0.6);
}

.data-table-container {
  background: rgba(20, 40, 60, 0.5);
  border-radius: 12px;
  padding: 20px;
  overflow: hidden;
  border: 1px solid rgba(41, 121, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
}

.data-table th {
  background: rgba(26, 115, 232, 0.2);
  color: #00bcd4;
  text-align: left;
  padding: 15px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid rgba(41, 121, 255, 0.3);
}

.data-table th i {
  margin-left: 8px;
}

.data-table td {
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:hover {
  background: rgba(26, 115, 232, 0.1);
}

.case-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.case-name i {
  color: #00bcd4;
}

.status-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-badge.completed {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.status-badge.processing {
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
}

.status-badge.pending {
  background: rgba(33, 150, 243, 0.2);
  color: #2196f3;
}

.actions {
  display: flex;
  gap: 10px;
}

.view-btn, .delete-btn {
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  border: none;
}

.view-btn {
  background: rgba(0, 188, 212, 0.2);
  color: #00bcd4;
}

.view-btn:hover {
  background: rgba(0, 188, 212, 0.3);
}

.delete-btn {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

.delete-btn:hover {
  background: rgba(244, 67, 54, 0.3);
}

.no-data {
  text-align: center;
  padding: 40px !important;
  color: rgba(255, 255, 255, 0.6);
}

.no-data i {
  font-size: 3rem;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.3);
}

.no-data p {
  font-size: 1.2rem;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 5px;
}

.pagination button {
  background: rgba(26, 115, 232, 0.2);
  color: #1a73e8;
  border: 1px solid rgba(26, 115, 232, 0.3);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background: rgba(26, 115, 232, 0.3);
}

.pagination button.active {
  background: #1a73e8;
  color: white;
  border-color: #1a73e8;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.delete-dialog {
  background: rgba(20, 40, 60, 0.95);
  border-radius: 12px;
  padding: 30px;
  width: 500px;
  max-width: 90%;
  border: 1px solid rgba(244, 67, 54, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.delete-dialog h3 {
  color: #f44336;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.delete-dialog p {
  margin-bottom: 30px;
  line-height: 1.6;
  text-align: center;
}

.dialog-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.cancel-btn, .confirm-delete-btn {
  padding: 10px 25px;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.confirm-delete-btn {
  background: rgba(244, 67, 54, 0.3);
  color: #f44336;
}

.confirm-delete-btn:hover {
  background: rgba(244, 67, 54, 0.4);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .page-header {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
  }

  .search-box input {
    width: 100%;
  }
}

@media (max-width: 992px) {
  .stats {
    flex-wrap: wrap;
  }

  .stat-card {
    min-width: calc(50% - 10px);
  }

  .data-table {
    font-size: 0.9rem;
  }

  .data-table th,
  .data-table td {
    padding: 10px 8px;
  }
}

@media (max-width: 768px) {
  .data-container {
    margin-top: 80px;
  }

  .header-actions {
    flex-direction: column;
    gap: 15px;
  }

  .date-filter {
    flex-wrap: wrap;
  }

  .actions {
    flex-direction: column;
    gap: 5px;
  }

  .view-btn, .delete-btn {
    width: 100%;
    justify-content: center;
  }

  .stat-card {
    min-width: 100%;
  }
}
</style>