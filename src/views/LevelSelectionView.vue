<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToAbout = () => {
  router.push({ path: '/', hash: '#about' }).then(() => {
    setTimeout(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  });
};

// レベル別の教材データ
const materials = ref({
  level3: [
    {
      id: 1,
      title: '財務諸表の基礎',
      description: '貸借対照表と損益計算書の基本的な読み方を学びます',
      questions: 50,
      estimatedTime: '2時間',
      difficulty: '基礎',
      completed: false,
    },
    {
      id: 2,
      title: '会計用語集',
      description: 'ビジネス会計検定3級で必要な基本的な会計用語を学習します',
      questions: 100,
      estimatedTime: '3時間',
      difficulty: '基礎',
      completed: false,
    },
    {
      id: 3,
      title: '財務諸表の構造',
      description: '財務諸表の各項目の意味と構造を詳しく解説します',
      questions: 60,
      estimatedTime: '2.5時間',
      difficulty: '基礎',
      completed: false,
    },
  ],
  level2: [
    {
      id: 4,
      title: '財務比率分析',
      description: '流動比率、自己資本比率など、重要な財務比率を学習します',
      questions: 80,
      estimatedTime: '4時間',
      difficulty: '中級',
      completed: false,
    },
    {
      id: 5,
      title: 'キャッシュフロー分析',
      description: 'キャッシュフロー計算書の読み方と分析方法を習得します',
      questions: 70,
      estimatedTime: '3.5時間',
      difficulty: '中級',
      completed: false,
    },
    {
      id: 6,
      title: '経営分析の実践',
      description: '実際の企業の財務諸表を使った経営分析の実践問題です',
      questions: 90,
      estimatedTime: '5時間',
      difficulty: '中級',
      completed: false,
    },
  ],
  level1: [
    {
      id: 7,
      title: '連結財務諸表の分析',
      description: '連結財務諸表の構造と分析手法を学習します',
      questions: 100,
      estimatedTime: '6時間',
      difficulty: '上級',
      completed: false,
    },
    {
      id: 8,
      title: '企業価値評価',
      description: 'DCF法など、企業価値を評価する手法を学びます',
      questions: 120,
      estimatedTime: '8時間',
      difficulty: '上級',
      completed: false,
    },
    {
      id: 9,
      title: '経営戦略の立案',
      description: '財務分析を基にした経営戦略の立案方法を学習します',
      questions: 110,
      estimatedTime: '7時間',
      difficulty: '上級',
      completed: false,
    },
  ],
});

const selectedLevel = ref<'level3' | 'level2' | 'level1'>('level3');

const selectLevel = (level: 'level3' | 'level2' | 'level1') => {
  selectedLevel.value = level;
};

const startMaterial = (materialId: number) => {
  // 財務諸表の基礎（materialId: 1）と会計用語集（materialId: 2）の場合は問題ページに遷移
  if (materialId === 1 || materialId === 2) {
    router.push(`/question/${materialId}`);
  } else {
    // その他の教材は今後実装
    console.log('教材を開始:', materialId);
  }
};

const getLevelLabel = (level: 'level3' | 'level2' | 'level1') => {
  const labels = {
    level3: '3級',
    level2: '2級',
    level1: '1級',
  };
  return labels[level];
};

const getLevelDescription = (level: 'level3' | 'level2' | 'level1') => {
  const descriptions = {
    level3: '財務諸表の基本的な読み方と会計の基礎知識を習得します',
    level2: '財務諸表の分析と経営判断に必要な知識を習得します',
    level1: '高度な財務分析と経営戦略立案に必要な知識を習得します',
  };
  return descriptions[level];
};
</script>

<template>
  <div class="level-selection-container">
    <!-- ヘッダー -->
    <header class="header">
      <div class="header-container">
        <h1 class="logo" @click="router.push('/')">特急ビジネス会計</h1>
        <nav class="nav">
          <router-link to="/" class="nav-link">ホーム</router-link>
          <router-link to="/levels" class="nav-link active">問題集</router-link>
          <a href="#about" class="nav-link" @click.prevent="goToAbout">検定について</a>
          <router-link to="/contact" class="nav-link">お問い合わせ</router-link>
        </nav>
      </div>
    </header>

    <!-- メインコンテンツ -->
    <main class="main-content">
      <div class="container">
        <!-- ページタイトル -->
        <div class="page-header">
          <h2 class="page-title">教材を選ぶ</h2>
          <p class="page-description">
            ビジネス会計検定のレベルに合わせて、最適な教材を選択してください
          </p>
        </div>

        <!-- レベル選択タブ -->
        <div class="level-tabs">
          <button
            :class="['tab-button', { active: selectedLevel === 'level3' }]"
            @click="selectLevel('level3')"
          >
            <span class="tab-badge level3">3級</span>
            <span class="tab-label">基礎レベル</span>
          </button>
          <button
            :class="['tab-button', { active: selectedLevel === 'level2' }]"
            @click="selectLevel('level2')"
          >
            <span class="tab-badge level2">2級</span>
            <span class="tab-label">実務レベル</span>
          </button>
          <button
            :class="['tab-button', { active: selectedLevel === 'level1' }]"
            @click="selectLevel('level1')"
          >
            <span class="tab-badge level1">1級</span>
            <span class="tab-label">上級レベル</span>
          </button>
        </div>

        <!-- レベル説明 -->
        <div class="level-description">
          <p>{{ getLevelDescription(selectedLevel) }}</p>
        </div>

        <!-- 教材一覧 -->
        <div class="materials-grid">
          <div
            v-for="material in materials[selectedLevel]"
            :key="material.id"
            class="material-card"
          >
            <div class="material-header">
              <div class="material-badge" :class="material.difficulty">
                {{ material.difficulty }}
              </div>
              <h3 class="material-title">{{ material.title }}</h3>
            </div>
            <p class="material-description">{{ material.description }}</p>
            <div class="material-stats">
              <div class="stat-item">
                <span class="stat-icon">📝</span>
                <span class="stat-text">{{ material.questions }}問</span>
              </div>
              <div class="stat-item">
                <span class="stat-icon">⏱️</span>
                <span class="stat-text">{{ material.estimatedTime }}</span>
              </div>
            </div>
            <button
              class="btn btn-primary btn-full"
              @click="startMaterial(material.id)"
            >
              学習を始める
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- フッター -->
    <footer class="footer">
      <div class="container">
        <p class="footer-text">&copy; 2024 特急ビジネス会計. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.level-selection-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

/* ヘッダー */
.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
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
  gap: 2rem;
}

.nav-link {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  font-size: 1rem;
}

.nav-link:hover {
  color: #2563eb;
}

.nav-link.active,
.nav-link.router-link-active {
  color: #2563eb;
  font-weight: 600;
}

/* メインコンテンツ */
.main-content {
  flex: 1;
  padding: 3rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ページヘッダー */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.page-description {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
}

/* レベル選択タブ */
.level-tabs {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 2rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 150px;
}

.tab-button:hover {
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
}

.tab-button.active {
  border-color: #2563eb;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
}

.tab-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1.125rem;
  color: white;
}

.tab-badge.level3 {
  background-color: #10b981;
}

.tab-badge.level2 {
  background-color: #2563eb;
}

.tab-badge.level1 {
  background-color: #8b5cf6;
}

.tab-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.tab-button.active .tab-label {
  color: #2563eb;
  font-weight: 600;
}

/* レベル説明 */
.level-description {
  text-align: center;
  margin-bottom: 3rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.level-description p {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
}

/* 教材グリッド */
.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.material-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.material-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.material-header {
  margin-bottom: 1rem;
}

.material-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.material-badge.基礎 {
  background-color: #d1fae5;
  color: #065f46;
}

.material-badge.中級 {
  background-color: #dbeafe;
  color: #1e40af;
}

.material-badge.上級 {
  background-color: #ede9fe;
  color: #5b21b6;
}

.material-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.material-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.material-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-icon {
  font-size: 1.25rem;
}

.stat-text {
  color: #374151;
  font-weight: 500;
  font-size: 0.875rem;
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

.btn-full {
  width: 100%;
}

/* フッター */
.footer {
  background-color: #1f2937;
  color: white;
  padding: 2rem 0;
  text-align: center;
  margin-top: auto;
}

.footer-text {
  margin: 0;
  color: #9ca3af;
}

/* レスポンシブ */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .level-tabs {
    flex-direction: column;
  }

  .tab-button {
    width: 100%;
  }

  .materials-grid {
    grid-template-columns: 1fr;
  }

  .header-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
}
</style>



