<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

const goToLogin = () => {
  router.push('/login');
};

const goToRegister = () => {
  router.push('/register');
};

const goToMyPage = () => {
  router.push('/mypage');
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollToLevels = () => {
  const levelsSection = document.getElementById('levels');
  if (levelsSection) {
    levelsSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="app">
    <!-- ヘッダー -->
    <header class="header">
      <div class="header-container">
        <h1 class="logo" @click="scrollToTop">特急ビジネス会計</h1>
        <nav class="nav">
          <router-link to="/" class="nav-link">ホーム</router-link>
          <router-link to="/levels" class="nav-link">問題集</router-link>
          <a href="#levels" class="nav-link" @click.prevent="scrollToLevels">検定について</a>
          <a href="#" class="nav-link">お問い合わせ</a>
          <router-link
            v-if="isLoggedIn"
            to="/mypage"
            class="nav-link"
          >
            マイページ
          </router-link>
        </nav>
      </div>
    </header>

    <!-- ヒーローセクション -->
    <section class="hero">
      <div class="hero-content">
        <h2 class="hero-title">ビジネス会計検定で<br />財務諸表を読み解く力を身につける</h2>
        <p class="hero-description">
          企業の財務状況を正確に理解し、経営判断に活かすための知識を習得しましょう
        </p>
        <div class="hero-buttons">
          <button class="btn btn-primary" @click="goToLogin">ログイン</button>
          <button class="btn btn-secondary" @click="goToRegister">新規登録</button>
        </div>
      </div>
    </section>

    <!-- 特徴セクション -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">ビジネス会計検定の特徴</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3 class="feature-title">財務諸表の読み方</h3>
            <p class="feature-description">
              貸借対照表や損益計算書など、財務諸表の基本的な読み方を学びます
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💼</div>
            <h3 class="feature-title">実務に活かせる知識</h3>
            <p class="feature-description">
              実際のビジネスシーンで使える会計知識を身につけることができます
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📈</div>
            <h3 class="feature-title">経営分析の基礎</h3>
            <p class="feature-description">
              財務比率分析など、企業の経営状況を分析する手法を学習します
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 検定レベルセクション -->
    <section id="levels" class="levels">
      <div class="container">
        <h2 class="section-title">検定レベル</h2>
        <div class="levels-grid">
          <div class="level-card">
            <div class="level-badge">3級</div>
            <h3 class="level-title">基礎レベル</h3>
            <p class="level-description">
              財務諸表の基本的な読み方と会計の基礎知識を習得します
            </p>
            <ul class="level-list">
              <li>財務諸表の構造</li>
              <li>基本的な会計用語</li>
              <li>財務諸表の読み方</li>
            </ul>
            <router-link to="/levels" class="btn btn-outline btn-small">
              教材を見る →
            </router-link>
          </div>
          <div class="level-card">
            <div class="level-badge">2級</div>
            <h3 class="level-title">実務レベル</h3>
            <p class="level-description">
              財務諸表の分析と経営判断に必要な知識を習得します
            </p>
            <ul class="level-list">
              <li>財務比率分析</li>
              <li>キャッシュフロー分析</li>
              <li>経営分析の実践</li>
            </ul>
            <router-link to="/levels" class="btn btn-outline btn-small">
              教材を見る →
            </router-link>
          </div>
          <div class="level-card">
            <div class="level-badge">1級</div>
            <h3 class="level-title">上級レベル</h3>
            <p class="level-description">
              高度な財務分析と経営戦略立案に必要な知識を習得します
            </p>
            <ul class="level-list">
              <li>連結財務諸表の分析</li>
              <li>企業価値評価</li>
              <li>経営戦略の立案</li>
            </ul>
            <router-link to="/levels" class="btn btn-outline btn-small">
              教材を見る →
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- CTAセクション -->
    <section class="cta">
      <div class="container">
        <h2 class="cta-title">今すぐ学習を始めましょう</h2>
        <p class="cta-description">
          無料で問題集にアクセスして、ビジネス会計検定の準備を始められます
        </p>
        <div class="cta-buttons">
          <router-link to="/levels" class="btn btn-primary btn-large">
            教材を選ぶ
          </router-link>
          <button class="btn btn-secondary btn-large" @click="goToRegister">
            新規登録で始める
          </button>
        </div>
      </div>
    </section>

    <!-- フッター -->
    <footer class="footer">
      <div class="container">
        <p class="footer-text">&copy; 2024 特急ビジネス会計. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;
  padding: 0;
}

.nav-link:hover {
  color: #2563eb;
}

.nav-link.router-link-active {
  color: #2563eb;
}

/* ヒーローセクション */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
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

.btn-secondary {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.btn-large {
  padding: 1rem 3rem;
  font-size: 1.125rem;
}

.btn-small {
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
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

/* コンテナ */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* セクションタイトル */
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1f2937;
}

/* 特徴セクション */
.features {
  padding: 5rem 0;
  background-color: #f9fafb;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.feature-description {
  color: #6b7280;
  line-height: 1.6;
}

/* 検定レベルセクション */
.levels {
  padding: 5rem 0;
  background-color: white;
}

.levels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.level-card {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 2.5rem;
  border-radius: 12px;
  border: 2px solid #e0f2fe;
  transition: transform 0.2s, border-color 0.2s;
}

.level-card:hover {
  transform: translateY(-4px);
  border-color: #2563eb;
}

.level-badge {
  display: inline-block;
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.level-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.level-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.level-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.level-list li {
  padding: 0.5rem 0;
  color: #374151;
  position: relative;
  padding-left: 1.5rem;
}

.level-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #2563eb;
  font-weight: bold;
}

.level-card {
  display: flex;
  flex-direction: column;
}

.level-card .btn {
  margin-top: auto;
  margin-top: 1.5rem;
}

/* CTAセクション */
.cta {
  padding: 5rem 0;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  text-align: center;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
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
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .section-title {
    font-size: 2rem;
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

  .features-grid,
  .levels-grid {
    grid-template-columns: 1fr;
  }
}
</style>

