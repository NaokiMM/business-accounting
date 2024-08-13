<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const materialId = computed(() => Number(route.params.materialId));

// 問題データセット
const questionSets: Record<number, Array<{
  id: number;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
}>> = {
  1: [
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
  ],
  2: [
    {
      id: 1,
      question: '「資産」の定義として正しいのはどれですか？',
      choices: [
        '会社が借りているお金',
        '会社が所有している経済的価値のあるもの',
        '会社が株主から集めた資金',
        '会社が支払うべき債務'
      ],
      correctAnswer: 1,
      explanation: '資産とは、会社が所有している経済的価値のあるものを指します。現金、売掛金、建物、土地などが該当します。'
    },
    {
      id: 2,
      question: '「負債」の定義として正しいのはどれですか？',
      choices: [
        '会社が所有している財産',
        '会社が将来返済する義務があるもの',
        '会社が稼いだ利益',
        '会社の資本金'
      ],
      correctAnswer: 1,
      explanation: '負債とは、会社が将来返済する義務があるものを指します。借入金、買掛金、未払金などが該当します。'
    },
    {
      id: 3,
      question: '「純資産」とは何を指しますか？',
      choices: [
        '資産から負債を差し引いたもの',
        '資産と負債を合計したもの',
        '負債から資産を差し引いたもの',
        '売上高から売上原価を差し引いたもの'
      ],
      correctAnswer: 0,
      explanation: '純資産とは、資産から負債を差し引いたもので、会社の正味の財産を表します。資本金、利益剰余金などが含まれます。'
    },
    {
      id: 4,
      question: '「売上原価」とは何を指しますか？',
      choices: [
        '商品を販売するためにかかった費用',
        '売上に対応する商品の仕入原価や製造原価',
        '従業員に支払う給与',
        '広告宣伝費'
      ],
      correctAnswer: 1,
      explanation: '売上原価とは、売上に対応する商品の仕入原価や製造原価を指します。売上高から売上原価を差し引くと売上総利益になります。'
    },
    {
      id: 5,
      question: '「販売費及び一般管理費」に含まれるのはどれですか？',
      choices: [
        '売上原価',
        '人件費、広告宣伝費、事務所の賃借料など',
        '借入金の返済',
        '資本金の増資'
      ],
      correctAnswer: 1,
      explanation: '販売費及び一般管理費には、人件費、広告宣伝費、事務所の賃借料、減価償却費など、営業活動に必要な費用が含まれます。'
    }
  ],
  3: [
    {
      id: 1,
      question: '貸借対照表（B/S）の構成要素として正しいのはどれですか？',
      choices: [
        '資産、負債、純資産の3つ',
        '資産と負債の2つ',
        '収益と費用の2つ',
        '資産、負債、収益、費用の4つ'
      ],
      correctAnswer: 0,
      explanation: '貸借対照表は「資産 = 負債 + 純資産」という等式で表され、資産、負債、純資産の3つの構成要素からなります。'
    },
    {
      id: 2,
      question: '損益計算書（P/L）の構成要素として正しいのはどれですか？',
      choices: [
        '資産と負債',
        '収益と費用',
        '資産と純資産',
        '負債と純資産'
      ],
      correctAnswer: 1,
      explanation: '損益計算書は、一定期間の収益と費用を対比させて、その期間の利益を表示する財務諸表です。'
    },
    {
      id: 3,
      question: '貸借対照表において、「流動資産」と「固定資産」の区分基準は何ですか？',
      choices: [
        '資産の価値の大小',
        '資産の取得時期',
        '資産の換金性や使用期間（1年基準）',
        '資産の種類'
      ],
      correctAnswer: 2,
      explanation: '流動資産と固定資産の区分は、通常1年を基準として、1年以内に現金化されるか、または1年以内に費用化されるものを流動資産、それ以外を固定資産とします。'
    },
    {
      id: 4,
      question: '損益計算書において、「営業外収益」に該当するのはどれですか？',
      choices: [
        '売上高',
        '受取利息',
        '売上原価',
        '人件費'
      ],
      correctAnswer: 1,
      explanation: '営業外収益は、本業以外の活動から生じる収益で、受取利息、受取配当金、為替差益などが含まれます。'
    },
    {
      id: 5,
      question: '貸借対照表において、「流動負債」に該当するのはどれですか？',
      choices: [
        '長期借入金',
        '買掛金',
        '資本金',
        '固定資産'
      ],
      correctAnswer: 1,
      explanation: '流動負債は、1年以内に返済期限が到来する負債で、買掛金、短期借入金、未払金、前受金などが含まれます。'
    }
  ],
  4: [
    {
      id: 1,
      question: '「流動比率」の計算式として正しいのはどれですか？',
      choices: [
        '流動資産 ÷ 流動負債 × 100',
        '流動負債 ÷ 流動資産 × 100',
        '総資産 ÷ 総負債 × 100',
        '自己資本 ÷ 総資産 × 100'
      ],
      correctAnswer: 0,
      explanation: '流動比率は「流動資産 ÷ 流動負債 × 100」で計算されます。短期的な支払能力を示す指標で、200%以上が望ましいとされています。'
    },
    {
      id: 2,
      question: '「自己資本比率」の計算式として正しいのはどれですか？',
      choices: [
        '自己資本 ÷ 総資産 × 100',
        '総資産 ÷ 自己資本 × 100',
        '負債 ÷ 自己資本 × 100',
        '自己資本 ÷ 負債 × 100'
      ],
      correctAnswer: 0,
      explanation: '自己資本比率は「自己資本 ÷ 総資産 × 100」で計算されます。企業の財務安全性を示す指標で、高いほど財務体質が健全であると評価されます。'
    },
    {
      id: 3,
      question: '「総資産回転率」の計算式として正しいのはどれですか？',
      choices: [
        '売上高 ÷ 総資産',
        '総資産 ÷ 売上高',
        '純利益 ÷ 総資産 × 100',
        '総資産 ÷ 純利益 × 100'
      ],
      correctAnswer: 0,
      explanation: '総資産回転率は「売上高 ÷ 総資産」で計算されます。総資産をどれだけ効率的に活用して売上を上げているかを示す指標です。'
    },
    {
      id: 4,
      question: '「ROE（自己資本利益率）」の計算式として正しいのはどれですか？',
      choices: [
        '当期純利益 ÷ 自己資本 × 100',
        '自己資本 ÷ 当期純利益 × 100',
        '営業利益 ÷ 自己資本 × 100',
        '総資産 ÷ 自己資本 × 100'
      ],
      correctAnswer: 0,
      explanation: 'ROE（自己資本利益率）は「当期純利益 ÷ 自己資本 × 100」で計算されます。株主資本がどれだけ効率的に使われて利益を生み出しているかを示す指標です。'
    },
    {
      id: 5,
      question: '「売上高営業利益率」の計算式として正しいのはどれですか？',
      choices: [
        '営業利益 ÷ 売上高 × 100',
        '売上高 ÷ 営業利益 × 100',
        '営業利益 ÷ 総資産 × 100',
        '売上高 ÷ 総資産 × 100'
      ],
      correctAnswer: 0,
      explanation: '売上高営業利益率は「営業利益 ÷ 売上高 × 100」で計算されます。売上高に対する営業利益の割合を示し、本業の収益性を評価する指標です。'
    }
  ]
};

const materialTitles: Record<number, string> = {
  1: '財務諸表の基礎',
  2: '会計用語集',
  3: '財務諸表の構造',
  4: '財務比率分析'
};

const questions = computed(() => questionSets[materialId.value] || []);
const materialTitle = computed(() => materialTitles[materialId.value] || '問題');

const currentQuestionIndex = ref(0);
const selectedAnswer = ref<number | null>(null);
const showResult = ref(false);
const showExplanation = ref(false);
const score = ref(0);

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1);
const progress = computed(() => questions.value.length > 0 ? ((currentQuestionIndex.value + 1) / questions.value.length) * 100 : 0);

const selectAnswer = (index: number) => {
  if (showResult.value) return;
  selectedAnswer.value = index;
};

const submitAnswer = () => {
  if (selectedAnswer.value === null || !currentQuestion.value) return;
  
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
          <h2 class="page-title">{{ materialTitle }}</h2>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <p class="progress-text">問題 {{ currentQuestionIndex + 1 }} / {{ questions.length }}</p>
        </div>

        <!-- 問題カード -->
        <div v-if="currentQuestion" class="question-card">
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
