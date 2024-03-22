import { createRouter, createWebHistory } from 'vue-router';
import History from '../components/the-history.vue';
import HistoryMainPage from '../components/history-main-page.vue';
import Call from '../../modules/main/modules/registry/modules/call/components/the-call.vue';

const routes = [
  {
    path: '/',
    component: History,
    children: [
      {
        path: '/',
        name: 'history',
        component: HistoryMainPage,
      },
      {
        path: '/:pathMatch(.*)',
        name: 'call',
        component: Call,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    // component: notFound
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('access-token') && !to.query.accessToken) {
    const desiredUrl = encodeURIComponent(window.location.href);
    const authUrl = import.meta.env.VITE_AUTH_URL;
    window.location.href = `${authUrl}?redirectTo=${desiredUrl}`;
  } else if (to.query.accessToken) {
    // assume that access token was set from query before app initialization in main.js
    const newQuery = { ...to.query };
    delete newQuery.accessToken;
    next({ ...to, query: newQuery });
  } else {
    next();
  }
});

export default router;
