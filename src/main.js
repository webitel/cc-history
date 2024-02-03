import { createApp } from 'vue';

import App from './the-app.vue';
import router from './app/router';
import store from './app/store';
import i18n from './app/locale/i18n';

import WebitelUi from './app/plugins/webitel-ui';

import './app/assets/icons/sprite';

const fetchConfig = async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}/config.json`);
  return response.json();
};

const createVueInstance = () => {
  const app = createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .use(...WebitelUi);
  return app;
};

// init IIFE
(async () => {
  const config = await fetchConfig();
  const app = createVueInstance();
  app.provide('$config', config);
  app.mount('#app');
})();
