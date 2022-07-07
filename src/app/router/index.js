import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@webitel/ui-sdk/src/modules/Userinfo/components/the-auth.vue';
import History from '../components/the-history.vue';
import Call from '../../modules/main/modules/registry/modules/call/components/the-call.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
  },
  {
    path: '/',
    name: 'history',
    component: History,
  },
  {
    path: '/*',
    name: 'call',
    component: Call,
  },
  {
    path: '*',
    name: 'not-found',
    // component: notFound
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access-token');
  if (!(to.fullPath === '/auth')) {
    if (!token) {
      next('/auth');
    }
  }
  next();
});

export default router;
