import Vue from 'vue';
import Vuex from 'vuex';
import history from './modules/history/history';
import userinfo from './modules/userinfo/userinfo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    history,
    userinfo,
  },
});
