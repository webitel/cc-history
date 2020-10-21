import Vue from 'vue';
import Vuex from 'vuex';
import StoreModules from './modules/StoreModules.enum';
import registry from './modules/registry/registry';
import dashboards from './modules/dashboards/dashboards';
import userinfo from './modules/userinfo/userinfo';

Vue.use(Vuex);

const state = {
  state: StoreModules.DASHBOARDS,
};

const actions = {
  LOAD_DATA: (context, payload) => context.dispatch(`${context.state.state}/LOAD_DATA`, payload),
  SET_APP_STATE: (context, state) => context.commit('SET_APP_STATE', state),
};

const mutations = {
  SET_APP_STATE: (state, appState) => {
    state.state = appState;
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    registry,
    dashboards,
    userinfo,
  },
});
