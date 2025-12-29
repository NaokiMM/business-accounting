<script setup lang="ts">
import { ref, computed } from 'vue';

const emit = defineEmits<{
  (e: 'goToLogin'): void;
  (e: 'goToHome'): void;
}>();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const agreedToTerms = ref(false);

const passwordMatch = computed(() => {
  if (!confirmPassword.value) return true;
  return password.value === confirmPassword.value;
});

const isFormValid = computed(() => {
  return (
    name.value &&
    email.value &&
    password.value &&
    confirmPassword.value &&
    passwordMatch.value &&
    agreedToTerms.value
  );
});

const handleRegister = async () => {
  // バリデーション
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'すべての項目を入力してください';
    return;
  }

  if (!passwordMatch.value) {
    errorMessage.value = 'パスワードが一致しません';
    return;
  }

  if (password.value.length < 8) {
    errorMessage.value = 'パスワードは8文字以上で入力してください';
    return;
  }

  if (!agreedToTerms.value) {
    errorMessage.value = '利用規約に同意してください';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  // TODO: 実際の登録処理を実装
  try {
    // シミュレーション
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('登録成功:', { name: name.value, email: email.value });
    // 登録成功後の処理（ログイン画面への遷移など）
    emit('goToLogin');
  } catch (error) {
    errorMessage.value = '登録に失敗しました。もう一度お試しください。';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <h1 class="register-title">新規登録</h1>
        <p class="register-subtitle">ビジネス会計検定アカウントを作成</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div class="form-group">
          <label for="name" class="form-label">お名前</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="form-input"
            placeholder="山田 太郎"
            required
            autocomplete="name"
          />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">メールアドレス</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-input"
            placeholder="example@email.com"
            required
            autocomplete="email"
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">パスワード</label>
          <div class="password-input-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              :class="{ 'input-error': password && password.length < 8 }"
              placeholder="8文字以上で入力"
              required
              autocomplete="new-password"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <p v-if="password && password.length < 8" class="form-hint">
            パスワードは8文字以上で入力してください
          </p>
        </div>

        <div class="form-group">
          <label for="confirmPassword" class="form-label">パスワード（確認）</label>
          <div class="password-input-wrapper">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="form-input"
              :class="{ 'input-error': confirmPassword && !passwordMatch }"
              placeholder="パスワードを再入力"
              required
              autocomplete="new-password"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              {{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <p v-if="confirmPassword && !passwordMatch" class="form-hint error">
            パスワードが一致しません
          </p>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="agreedToTerms" required />
            <span>
              <a href="#" class="terms-link">利用規約</a>と
              <a href="#" class="terms-link">プライバシーポリシー</a>に同意します
            </span>
          </label>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-full"
          :disabled="isLoading || !isFormValid"
        >
          {{ isLoading ? '登録中...' : '新規登録' }}
        </button>
      </form>

      <div class="register-footer">
        <p class="login-link-text">
          すでにアカウントをお持ちの方は
          <a href="#" @click.prevent="emit('goToLogin')" class="login-link">
            ログイン
          </a>
        </p>
        <a href="#" @click.prevent="emit('goToHome')" class="back-link">
          ← トップページに戻る
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.register-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 3rem;
  width: 100%;
  max-width: 500px;
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.register-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.register-subtitle {
  color: #6b7280;
  margin: 0;
  font-size: 0.95rem;
}

.register-form {
  margin-bottom: 2rem;
}

.error-message {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  border: 1px solid #fecaca;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-input.input-error {
  border-color: #dc2626;
}

.form-input.input-error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-hint {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.form-hint.error {
  color: #dc2626;
}

.password-input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #374151;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
  margin-top: 0.125rem;
  cursor: pointer;
  flex-shrink: 0;
}

.terms-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.terms-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

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

.btn-primary:hover:not(:disabled) {
  background-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-full {
  width: 100%;
}

.register-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.login-link-text {
  color: #6b7280;
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
}

.login-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.login-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.back-link {
  display: inline-block;
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: #2563eb;
}

@media (max-width: 480px) {
  .register-card {
    padding: 2rem 1.5rem;
  }

  .register-title {
    font-size: 1.75rem;
  }
}
</style>

