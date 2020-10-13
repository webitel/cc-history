import Vue from 'vue';
import Vuex from 'vuex';
import history from './modules/registry/history';
import dashboards from './modules/dashboards/dashboards';
import userinfo from './modules/userinfo/userinfo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    history,
    dashboards,
    userinfo,
  },
});
