import Vue from 'vue';
import Vuex from 'vuex';
import userinfo from './modules/userinfo/userinfo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userinfo,
  },
});
