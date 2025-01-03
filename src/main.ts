import { createApp } from 'vue';
import { createPinia } from "pinia";
import instance from './app/api/instance';

import App from './the-app.vue';
import router from './app/router';
import store from './app/store';
import i18n from './app/locale/i18n';

import WebitelUi from './app/plugins/webitel-ui';

import './app/assets/icons/sprite';

const setTokenFromUrl = () => {
  try {
    const queryMap = window.location.search.slice(1)
    .split('&')
    .reduce((obj, query) => {
      const [key, value] = query.split('=');
      obj[key] = value;
      return obj;
    }, {});

    if (queryMap.accessToken) {
      localStorage.setItem('access-token', queryMap.accessToken);
    }
  } catch (err) {
    console.error('Error restoring token from url', err);
  }
};

const fetchConfig = async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}/config.json`);
  return response.json();
};

const initSession = async () => store.dispatch('userinfo/OPEN_SESSION', { instance });

const createVueInstance = () => {
  const pinia = createPinia();

  console.info(pinia)

  const app = createApp(App)
      .use(pinia)
  .use(router)
  .use(store)
  .use(i18n)
  .use(...WebitelUi);
  return app;
};

// init IIFE
(async () => {
  let config;
  try {
    setTokenFromUrl();
    config = await fetchConfig();
    await initSession();
  } catch (err) {
    console.error('before app mount error:', err);
  }finally {
    const app = createVueInstance();
    app.provide('$config', config);
    app.mount('#app');
  }
})();
