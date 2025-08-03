<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// ユーザー情報（実際の実装ではAPIから取得）
const user = ref({
  name: '山田 太郎',
  email: 'yamada@example.com',
  memberSince: '2024年1月',
  level: '3級',
});

// 学習統計
const stats = ref({
  totalQuestions: 150,
  correctAnswers: 120,
  studyDays: 25,
  currentStreak: 5,
});

// 進捗率
const progressRate = computed(() => {
  return Math.round((stats.value.correctAnswers / stats.value.totalQuestions) * 100);
});

// レベル別進捗
const levelProgress = ref([
  { level: '3級', completed: 45, total: 50, percentage: 90 },
  { level: '2級', completed: 20, total: 50, percentage: 40 },
  { level: '1級', completed: 5, total: 50, percentage: 10 },
]);

// 最近の学習履歴
const recentHistory = ref([
  { date: '2024年12月15日', level: '3級', score: 85, questions: 20 },
  { date: '2024年12月14日', level: '3級', score: 90, questions: 20 },
  { date: '2024年12月13日', level: '3級', score: 75, questions: 20 },
]);

const handleLogout = () => {
  if (confirm('ログアウトしますか？')) {
    router.push('/');
  }
};
</script>

<template>
  <div class="mypage-container">
    <!-- ヘッダー -->
    <header class="mypage-header">
      <div class="header-content">
        <h1 class="logo" @click="router.push('/')">特急ビジネス会計</h1>
        <nav class="nav">
          <router-link to="/" class="nav-link">ホーム</router-link>
          <button class="nav-link active">マイページ</button>
          <button class="nav-link logout-btn" @click="handleLogout">ログアウト</button>
        </nav>
      </div>
    </header>

    <div class="mypage-content">
      <div class="container">
        <!-- ユーザー情報セクション -->
        <section class="user-section">
          <div class="user-card">
            <div class="user-avatar">
              <div class="avatar-circle">{{ user.name.charAt(0) }}</div>
            </div>
            <div class="user-info">
              <h2 class="user-name">{{ user.name }}</h2>
              <p class="user-email">{{ user.email }}</p>
              <div class="user-meta">
                <span class="meta-item">会員登録: {{ user.memberSince }}</span>
                <span class="meta-item">現在のレベル: {{ user.level }}</span>
              </div>
            </div>
            <button class="btn btn-outline">プロフィール編集</button>
          </div>
        </section>

        <!-- 統計セクション -->
        <section class="stats-section">
          <h2 class="section-title">学習統計</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <div class="stat-value">{{ stats.totalQuestions }}</div>
                <div class="stat-label">総問題数</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-content">
                <div class="stat-value">{{ stats.correctAnswers }}</div>
                <div class="stat-label">正解数</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📈</div>
              <div class="stat-content">
                <div class="stat-value">{{ progressRate }}%</div>
                <div class="stat-label">正答率</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🔥</div>
              <div class="stat-content">
                <div class="stat-value">{{ stats.currentStreak }}</div>
                <div class="stat-label">連続学習日数</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 進捗セクション -->
        <section class="progress-section">
          <h2 class="section-title">レベル別進捗</h2>
          <div class="progress-list">
            <div v-for="level in levelProgress" :key="level.level" class="progress-item">
              <div class="progress-header">
                <span class="level-badge">{{ level.level }}</span>
                <span class="progress-text">{{ level.completed }} / {{ level.total }} 完了</span>
              </div>
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: level.percentage + '%' }"
                ></div>
              </div>
              <div class="progress-percentage">{{ level.percentage }}%</div>
            </div>
          </div>
        </section>

        <!-- 学習履歴セクション -->
        <section class="history-section">
          <h2 class="section-title">最近の学習履歴</h2>
          <div class="history-list">
            <div v-for="(item, index) in recentHistory" :key="index" class="history-item">
              <div class="history-date">{{ item.date }}</div>
              <div class="history-details">
                <span class="history-level">{{ item.level }}</span>
                <span class="history-score">スコア: {{ item.score }}点</span>
                <span class="history-questions">{{ item.questions }}問</span>
              </div>
            </div>
          </div>
        </section>

        <!-- アクションボタン -->
        <section class="actions-section">
          <button class="btn btn-primary btn-large">学習を始める</button>
          <button class="btn btn-outline btn-large">問題集を見る</button>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mypage-container {
  min-height: 100vh;
  background-color: #f9fafb;
}

/* ヘッダー */
.mypage-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
  margin: 0;
  cursor: pointer;
  transition: color 0.2s;
}

.logo:hover {
  color: #1d4ed8;
}

.nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  background: none;
  border: none;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0.5rem 0;
}

.nav-link:hover {
  color: #2563eb;
}

.nav-link.active {
  color: #2563eb;
  font-weight: 600;
}

.logout-btn {
  color: #dc2626;
}

.logout-btn:hover {
  color: #b91c1c;
}

.mypage-content {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ユーザー情報セクション */
.user-section {
  margin-bottom: 3rem;
}

.user-card {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 2rem;
}

.user-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.user-email {
  color: #6b7280;
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.user-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.meta-item {
  color: #374151;
  font-size: 0.875rem;
}

/* 統計セクション */
.stats-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1.5rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
}

/* 進捗セクション */
.progress-section {
  margin-bottom: 3rem;
}

.progress-list {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.progress-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.level-badge {
  display: inline-block;
  background-color: #2563eb;
  color: white;
  padding: 0.375rem 0.875rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
}

.progress-text {
  color: #6b7280;
  font-size: 0.875rem;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background-color: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%);
  border-radius: 6px;
  transition: width 0.3s ease;
}

.progress-percentage {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
}

/* 学習履歴セクション */
.history-section {
  margin-bottom: 3rem;
}

.history-list {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.history-item:hover {
  background-color: #f3f4f6;
}

.history-date {
  color: #374151;
  font-weight: 500;
}

.history-details {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.history-level {
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
}

.history-score {
  color: #059669;
  font-weight: 600;
}

.history-questions {
  color: #6b7280;
  font-size: 0.875rem;
}

/* アクションボタンセクション */
.actions-section {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

/* ボタン */
.btn {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

.btn-outline {
  background-color: transparent;
  color: #2563eb;
  border: 2px solid #2563eb;
}

.btn-outline:hover {
  background-color: #2563eb;
  color: white;
}

.btn-large {
  padding: 1rem 3rem;
  font-size: 1.125rem;
}

/* レスポンシブ */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .nav {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .user-card {
    flex-direction: column;
    text-align: center;
  }

  .user-meta {
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .history-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .history-details {
    width: 100%;
    flex-wrap: wrap;
  }

  .actions-section {
    flex-direction: column;
  }

  .btn-large {
    width: 100%;
  }
}
</style>

