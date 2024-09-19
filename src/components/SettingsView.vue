<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// ユーザー設定情報
const settings = ref({
  name: '山田 太郎',
  email: 'yamada@example.com',
  password: '',
  confirmPassword: '',
  notifications: {
    email: true,
    push: false,
  },
  preferences: {
    theme: 'light',
    language: 'ja',
  },
});

const isLoading = ref(false);
const saveSuccess = ref(false);
const errorMessage = ref('');

const handleSave = async () => {
  if (settings.value.password && settings.value.password !== settings.value.confirmPassword) {
    errorMessage.value = 'パスワードが一致しません';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  saveSuccess.value = false;

  try {
    // TODO: 実際の保存処理を実装
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('設定を保存:', settings.value);
    saveSuccess.value = true;
    
    setTimeout(() => {
      saveSuccess.value = false;
    }, 3000);
  } catch (error) {
    errorMessage.value = '設定の保存に失敗しました。もう一度お試しください。';
  } finally {
    isLoading.value = false;
  }
};

const handleCancel = () => {
  router.push('/mypage');
};
</script>

<template>
  <div class="settings-container">
    <!-- ヘッダー -->
    <header class="settings-header">
      <div class="header-content">
        <h1 class="logo" @click="router.push('/')">特急ビジネス会計</h1>
        <nav class="nav">
          <router-link to="/" class="nav-link">ホーム</router-link>
          <router-link to="/mypage" class="nav-link">マイページ</router-link>
          <router-link to="/settings" class="nav-link active">設定</router-link>
          <button class="nav-link logout-btn" @click="router.push('/')">ログアウト</button>
        </nav>
      </div>
    </header>

    <div class="settings-content">
      <div class="container">
        <!-- ページタイトル -->
        <div class="page-header">
          <h2 class="page-title">設定</h2>
          <p class="page-description">アカウント設定や各種設定を変更できます</p>
        </div>

        <!-- 設定フォーム -->
        <div class="settings-form-wrapper">
          <form @submit.prevent="handleSave" class="settings-form">
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>

            <div v-if="saveSuccess" class="success-message">
              設定を保存しました
            </div>

            <!-- プロフィール設定 -->
            <section class="settings-section">
              <h3 class="section-title">プロフィール設定</h3>
              
              <div class="form-group">
                <label for="name" class="form-label">お名前</label>
                <input
                  id="name"
                  v-model="settings.name"
                  type="text"
                  class="form-input"
                  placeholder="お名前を入力"
                  required
                />
              </div>

              <div class="form-group">
                <label for="email" class="form-label">メールアドレス</label>
                <input
                  id="email"
                  v-model="settings.email"
                  type="email"
                  class="form-input"
                  placeholder="メールアドレスを入力"
                  required
                />
              </div>
            </section>

            <!-- パスワード変更 -->
            <section class="settings-section">
              <h3 class="section-title">パスワード変更</h3>
              
              <div class="form-group">
                <label for="password" class="form-label">新しいパスワード</label>
                <input
                  id="password"
                  v-model="settings.password"
                  type="password"
                  class="form-input"
                  placeholder="新しいパスワードを入力（変更しない場合は空欄）"
                />
              </div>

              <div class="form-group">
                <label for="confirmPassword" class="form-label">パスワード確認</label>
                <input
                  id="confirmPassword"
                  v-model="settings.confirmPassword"
                  type="password"
                  class="form-input"
                  placeholder="新しいパスワードを再入力"
                />
              </div>
            </section>

            <!-- 通知設定 -->
            <section class="settings-section">
              <h3 class="section-title">通知設定</h3>
              
              <div class="form-group">
                <label class="form-label-checkbox">
                  <input
                    v-model="settings.notifications.email"
                    type="checkbox"
                    class="checkbox-input"
                  />
                  <span class="checkbox-label">メール通知を受け取る</span>
                </label>
              </div>

              <div class="form-group">
                <label class="form-label-checkbox">
                  <input
                    v-model="settings.notifications.push"
                    type="checkbox"
                    class="checkbox-input"
                  />
                  <span class="checkbox-label">プッシュ通知を受け取る</span>
                </label>
              </div>
            </section>

            <!-- その他の設定 -->
            <section class="settings-section">
              <h3 class="section-title">その他の設定</h3>
              
              <div class="form-group">
                <label for="theme" class="form-label">テーマ</label>
                <select id="theme" v-model="settings.preferences.theme" class="form-select">
                  <option value="light">ライト</option>
                  <option value="dark">ダーク</option>
                  <option value="auto">自動</option>
                </select>
              </div>

              <div class="form-group">
                <label for="language" class="form-label">言語</label>
                <select id="language" v-model="settings.preferences.language" class="form-select">
                  <option value="ja">日本語</option>
                  <option value="en">English</option>
                </select>
              </div>
            </section>

            <!-- ボタン -->
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="handleCancel">
                キャンセル
              </button>
              <button type="submit" class="btn btn-primary" :disabled="isLoading">
                {{ isLoading ? '保存中...' : '保存する' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- フッター -->
    <footer class="footer">
      <div class="container">
        <p class="footer-text">&copy; 2024 特急ビジネス会計. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.settings-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

/* ヘッダー */
.settings-header {
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

.nav-link.active,
.nav-link.router-link-active {
  color: #2563eb;
  font-weight: 600;
}

.logout-btn {
  color: #dc2626;
}

.logout-btn:hover {
  color: #b91c1c;
}

/* メインコンテンツ */
.settings-content {
  flex: 1;
  padding: 3rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.page-description {
  font-size: 1.125rem;
  color: #6b7280;
}

/* 設定フォーム */
.settings-form-wrapper {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.settings-form {
  max-width: 600px;
  margin: 0 auto;
}

.settings-section {
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #e5e7eb;
}

.settings-section:last-of-type {
  border-bottom: none;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #2563eb;
}

.form-label-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  color: #1f2937;
}

.checkbox-input {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
  cursor: pointer;
}

.checkbox-label {
  cursor: pointer;
}

.error-message {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.success-message {
  background-color: #d1fae5;
  color: #059669;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

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

.btn-primary:hover:not(:disabled) {
  background-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .nav {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .settings-form-wrapper {
    padding: 2rem 1.5rem;
  }

  .settings-content {
    padding: 2rem 0;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
