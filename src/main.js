import Vue from 'vue';
import Vuelidate from 'vuelidate';
import WaveSurferVue from 'wavesurfer.js-vue';

import App from './the-app.vue';
import router from './app/router';
import store from './app/store';
import i18n from './app/locale/i18n';

import './app/plugins/webitel-ui';

import './app/css/main.scss';

import './app/assets/icons/sprite';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(WaveSurferVue);

const fetchConfig = async () => {
  const response = await fetch(`${process.env.BASE_URL}config.json`);
  return response.json();
};

const createVueInstance = () => {
  new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
  }).$mount('#app');
};

// init IIFE
(async () => {
  const config = await fetchConfig();
  Vue.prototype.$config = config;
  createVueInstance();
})();
