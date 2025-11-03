import { createRouter, createWebHistory } from 'vue-router';
import { eventBus } from '@webitel/ui-sdk/scripts';
import i18n from '../locale/i18n'
import { nextTick } from 'vue';

import Call from '../../modules/main/modules/registry/modules/call/components/the-call.vue';
import HistoryMainPage from '../components/history-main-page.vue';
import History from '../components/the-history.vue';
import CallTabsPathNames from './_internals/CallTabsPathNames.enum.js';
import callViewRoute from '../../modules/main/modules/registry/modules/call/router/call-view.ts';
const CallInfo = import(
  '../../modules/main/modules/registry/modules/call/components/call-info/call-info.vue'
);
const CallLegs = import(
  '../../modules/main/modules/registry/modules/call/components/call-legs/call-legs.vue'
);
const CallVisualization = import(
  '../../modules/main/modules/registry/modules/call/components/call-visualization/call-visualization.vue'
);

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
        redirect: { name: CallTabsPathNames.CALL_INFO },
        component: Call,
        children: [
          {
            path: 'call-info',
            name: CallTabsPathNames.CALL_INFO,
            component: CallInfo,
          },
          {
            path: 'legs-a-b',
            name: CallTabsPathNames.LEGS_A_B,
            component: CallLegs,
          },
          {
            path: 'call-visualization',
            name: CallTabsPathNames.CALL_VISUALIZATION,
            component: CallVisualization,
          },
        ],
      },
    ],
  },
  ...callViewRoute,
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    // component: notFound
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

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

router.afterEach(async () => {
  const passwordExpirationDays = localStorage.getItem('passwordExpirationDays');

  await nextTick();

  if (passwordExpirationDays) {
    const { t } = i18n.global;
    eventBus.$emit('notification', {
      type: 'info',
      text: t('systemNotifications.info.passwordExpirationMessage', { days: passwordExpirationDays }),
    });

    setTimeout(() => {
      localStorage.removeItem('passwordExpirationDays')
    }, 5000);
  }
});

export default router;
