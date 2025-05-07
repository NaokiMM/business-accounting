<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const isLoading = ref(false);
const submitSuccess = ref(false);
const errorMessage = ref('');

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    errorMessage.value = '名前、メールアドレス、お問い合わせ内容は必須項目です';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    // TODO: 実際の送信処理を実装
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('お問い合わせ送信:', formData.value);
    submitSuccess.value = true;
    formData.value = { name: '', email: '', subject: '', message: '' };
    
    setTimeout(() => {
      submitSuccess.value = false;
    }, 5000);
  } catch (error) {
    errorMessage.value = '送信に失敗しました。もう一度お試しください。';
  } finally {
    isLoading.value = false;
  }
};

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
</script>

<template>
  <div class="contact-container">
    <!-- ヘッダー -->
    <header class="header">
      <div class="header-container">
        <h1 class="logo" @click="router.push('/')">特急ビジネス会計</h1>
        <nav class="nav">
          <router-link to="/" class="nav-link">ホーム</router-link>
          <router-link to="/levels" class="nav-link">問題集</router-link>
          <a href="#about" class="nav-link" @click.prevent="goToAbout">検定について</a>
          <router-link to="/contact" class="nav-link active">お問い合わせ</router-link>
        </nav>
      </div>
    </header>

    <!-- メインコンテンツ -->
    <main class="main-content">
      <div class="container">
        <!-- ページタイトル -->
        <div class="page-header">
          <h2 class="page-title">お問い合わせ</h2>
          <p class="page-description">
            ご質問やご不明な点がございましたら、お気軽にお問い合わせください
          </p>
        </div>

        <!-- お問い合わせフォーム -->
        <div class="contact-form-wrapper">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>

            <div v-if="submitSuccess" class="success-message">
              お問い合わせを受け付けました。ありがとうございます。
            </div>

            <div class="form-group">
              <label for="name" class="form-label">
                お名前 <span class="required">*</span>
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="form-input"
                placeholder="山田 太郎"
                required
              />
            </div>

            <div class="form-group">
              <label for="email" class="form-label">
                メールアドレス <span class="required">*</span>
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-input"
                placeholder="example@email.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="subject" class="form-label">件名</label>
              <input
                id="subject"
                v-model="formData.subject"
                type="text"
                class="form-input"
                placeholder="お問い合わせの件名"
              />
            </div>

            <div class="form-group">
              <label for="message" class="form-label">
                お問い合わせ内容 <span class="required">*</span>
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                class="form-textarea"
                rows="8"
                placeholder="お問い合わせ内容をご記入ください"
                required
              ></textarea>
            </div>

            <div class="form-actions">
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isLoading"
              >
                {{ isLoading ? '送信中...' : '送信する' }}
              </button>
            </div>
          </form>
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
.contact-container {
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

/* メインコンテンツ */
.main-content {
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
  margin-bottom: 1rem;
}

.page-description {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.6;
}

/* お問い合わせフォーム */
.contact-form-wrapper {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 2rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.required {
  color: #ef4444;
}

.form-input,
.form-textarea {
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
.form-textarea:focus {
  outline: none;
  border-color: #2563eb;
}

.form-textarea {
  resize: vertical;
  min-height: 150px;
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
  margin-top: 2rem;
  text-align: center;
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

  .header-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .contact-form-wrapper {
    padding: 2rem 1.5rem;
  }

  .main-content {
    padding: 2rem 0;
  }
}
</style>
