<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 問題データ（財務諸表の基礎）
const questions = ref([
  {
    id: 1,
    question: '貸借対照表（B/S）において、資産の部に分類されるのはどれですか？',
    choices: [
      '売掛金',
      '借入金',
      '資本金',
      '未払金'
    ],
    correctAnswer: 0,
    explanation: '売掛金は資産に分類されます。借入金と未払金は負債、資本金は純資産に分類されます。'
  },
  {
    id: 2,
    question: '損益計算書（P/L）において、売上高から売上原価を差し引いたものを何といいますか？',
    choices: [
      '営業利益',
      '経常利益',
      '売上総利益（粗利益）',
      '当期純利益'
    ],
    correctAnswer: 2,
    explanation: '売上高から売上原価を差し引いたものを売上総利益（粗利益）といいます。'
  },
  {
    id: 3,
    question: '貸借対照表において、「流動資産」に含まれるのはどれですか？',
    choices: [
      '建物',
      '土地',
      '現金',
      '機械装置'
    ],
    correctAnswer: 2,
    explanation: '現金は流動資産に分類されます。建物、土地、機械装置は固定資産に分類されます。'
  },
  {
    id: 4,
    question: '損益計算書において、会社の本業から得られる利益を何といいますか？',
    choices: [
      '経常利益',
      '営業利益',
      '税引前当期純利益',
      '当期純利益'
    ],
    correctAnswer: 1,
    explanation: '営業利益は、本業の営業活動から得られる利益です。売上総利益から販売費及び一般管理費を差し引いたものになります。'
  },
  {
    id: 5,
    question: '貸借対照表において、資産の合計額と負債・純資産の合計額の関係はどうなっていますか？',
    choices: [
      '資産の合計額 = 負債の合計額',
      '資産の合計額 = 負債の合計額 + 純資産の合計額',
      '資産の合計額 = 純資産の合計額',
      '資産の合計額 > 負債の合計額 + 純資産の合計額'
    ],
    correctAnswer: 1,
    explanation: '貸借対照表では「資産 = 負債 + 純資産」という等式が成り立ちます。これを会計等式といいます。'
  }
]);

const currentQuestionIndex = ref(0);
const selectedAnswer = ref<number | null>(null);
const showResult = ref(false);
const showExplanation = ref(false);
const score = ref(0);

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1);
const progress = computed(() => ((currentQuestionIndex.value + 1) / questions.value.length) * 100);

const selectAnswer = (index: number) => {
  if (showResult.value) return;
  selectedAnswer.value = index;
};

const submitAnswer = () => {
  if (selectedAnswer.value === null) return;
  
  showResult.value = true;
  if (selectedAnswer.value === currentQuestion.value.correctAnswer) {
    score.value++;
  }
  
  setTimeout(() => {
    showExplanation.value = true;
  }, 300);
};

const nextQuestion = () => {
  if (isLastQuestion.value) {
    // 結果ページに遷移（または結果を表示）
    showResult.value = false;
    showExplanation.value = false;
    return;
  }
  
  currentQuestionIndex.value++;
  selectedAnswer.value = null;
  showResult.value = false;
  showExplanation.value = false;
};

const goToLevels = () => {
  router.push('/levels');
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
  <div class="question-container">
    <!-- ヘッダー -->
    <header class="header">
      <div class="header-container">
        <h1 class="logo" @click="router.push('/')">特急ビジネス会計</h1>
        <nav class="nav">
          <router-link to="/" class="nav-link">ホーム</router-link>
          <router-link to="/levels" class="nav-link">問題集</router-link>
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
          <h2 class="page-title">財務諸表の基礎</h2>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <p class="progress-text">問題 {{ currentQuestionIndex + 1 }} / {{ questions.length }}</p>
        </div>

        <!-- 問題カード -->
        <div class="question-card">
          <div class="question-content">
            <h3 class="question-text">{{ currentQuestion.question }}</h3>
            
            <div class="choices-container">
              <button
                v-for="(choice, index) in currentQuestion.choices"
                :key="index"
                :class="[
                  'choice-button',
                  {
                    'selected': selectedAnswer === index,
                    'correct': showResult && index === currentQuestion.correctAnswer,
                    'incorrect': showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer
                  }
                ]"
                @click="selectAnswer(index)"
                :disabled="showResult"
              >
                <span class="choice-label">{{ String.fromCharCode(65 + index) }}.</span>
                <span class="choice-text">{{ choice }}</span>
              </button>
            </div>

            <!-- 説明 -->
            <div v-if="showExplanation" class="explanation-box">
              <h4 class="explanation-title">
                <span v-if="selectedAnswer === currentQuestion.correctAnswer" class="correct-icon">✓</span>
                <span v-else class="incorrect-icon">✗</span>
                {{ selectedAnswer === currentQuestion.correctAnswer ? '正解です！' : '不正解です' }}
              </h4>
              <p class="explanation-text">{{ currentQuestion.explanation }}</p>
            </div>

            <!-- ボタン -->
            <div class="action-buttons">
              <button
                v-if="!showResult"
                @click="submitAnswer"
                :disabled="selectedAnswer === null"
                class="btn btn-primary"
              >
                回答する
              </button>
              <button
                v-else-if="!isLastQuestion"
                @click="nextQuestion"
                class="btn btn-primary"
              >
                次の問題へ
              </button>
              <div v-else class="result-actions">
                <div class="score-display">
                  <h3 class="score-title">結果</h3>
                  <p class="score-text">{{ score }} / {{ questions.length }} 問正解</p>
                  <p class="score-percentage">{{ Math.round((score / questions.length) * 100) }}%</p>
                </div>
                <button @click="goToLevels" class="btn btn-primary">
                  問題集に戻る
                </button>
              </div>
            </div>
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
.question-container {
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
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background-color: #2563eb;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 1rem;
  color: #6b7280;
  font-weight: 500;
}

/* 問題カード */
.question-card {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.question-content {
  max-width: 700px;
  margin: 0 auto;
}

.question-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* 選択肢 */
.choices-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.choice-button {
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background-color: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  font-size: 1.125rem;
  color: #1f2937;
  font-family: inherit;
}

.choice-button:hover:not(:disabled) {
  background-color: #f3f4f6;
  border-color: #2563eb;
}

.choice-button.selected {
  background-color: #eff6ff;
  border-color: #2563eb;
  color: #2563eb;
}

.choice-button.correct {
  background-color: #d1fae5;
  border-color: #10b981;
  color: #059669;
}

.choice-button.incorrect {
  background-color: #fee2e2;
  border-color: #ef4444;
  color: #dc2626;
}

.choice-button:disabled {
  cursor: not-allowed;
}

.choice-label {
  font-weight: 600;
  margin-right: 1rem;
  min-width: 2rem;
}

.choice-text {
  flex: 1;
}

/* 説明 */
.explanation-box {
  background-color: #f9fafb;
  border-left: 4px solid #2563eb;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.explanation-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.correct-icon {
  color: #10b981;
  font-size: 1.5rem;
}

.incorrect-icon {
  color: #ef4444;
  font-size: 1.5rem;
}

.explanation-text {
  color: #6b7280;
  line-height: 1.6;
  font-size: 1rem;
}

/* ボタン */
.action-buttons {
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

/* 結果 */
.result-actions {
  text-align: center;
}

.score-display {
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.score-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.score-text {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  opacity: 0.95;
}

.score-percentage {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
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

  .question-card {
    padding: 2rem 1.5rem;
  }

  .question-text {
    font-size: 1.25rem;
  }

  .choice-button {
    padding: 1rem;
    font-size: 1rem;
  }

  .main-content {
    padding: 2rem 0;
  }
}
</style>
