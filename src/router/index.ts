import { createRouter, createWebHistory } from 'vue-router';
import TopPageView from '../views/TopPageView.vue';
import LevelSelectionView from '../views/LevelSelectionView.vue';
import ContactView from '../views/ContactView.vue';
import QuestionView from '../views/QuestionView.vue';
import LoginView from '../components/LoginView.vue';
import RegisterView from '../components/RegisterView.vue';
import MyPageView from '../components/MyPageView.vue';
import SettingsView from '../components/SettingsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TopPageView,
    },
    {
      path: '/levels',
      name: 'levels',
      component: LevelSelectionView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPageView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/question/:materialId',
      name: 'question',
      component: QuestionView,
    },
  ],
});

export default router;

