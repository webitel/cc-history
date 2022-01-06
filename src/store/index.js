import Vue from 'vue';
import Vuex from 'vuex';
import StoreModules from './modules/StoreModules.enum';
import filters from './modules/filters/filters';
import registry from './modules/registry/registry';
import dashboards from './modules/dashboards/dashboards';
import userinfo from './modules/userinfo/userinfo';
import queryController from './modules/query-controller/query-controller';

Vue.use(Vuex);

const state = {
  state: StoreModules.REGISTRY,
};

const actions = {
  LOAD_DATA: (context, payload) => context.dispatch(`${context.state.state}/LOAD_DATA`, payload),
  SET_APP_STATE: (context, state) => context.commit('SET_APP_STATE', state),
  RESET_FILTERS: (context) => {
    context.dispatch('filters/RESET_FILTERS');
    context.dispatch(`${context.state.state}/filters/RESET_FILTERS`);
  },
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
    filters,
    registry,
    dashboards,
    userinfo,
    'query-controller': queryController,
  },
});
