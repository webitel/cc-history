import { createStore } from 'vuex';

import appearance from '../../modules/appearance/store/appearance';
import StoreModules from '../../modules/main/enums/StoreModules.enum';
import dashboards from '../../modules/main/modules/dashboards/store/dashboards';
// import filters from '../../modules/filters/store/filters';
import registry from '../../modules/main/modules/registry/store/registry';
import userinfo from '../../modules/userinfo/store/userinfo';

const state = {
  state: StoreModules.REGISTRY,
};

const actions = {
  LOAD_DATA: (context, payload) =>
    context.dispatch(`${context.state.state}/LOAD_DATA`, payload),
  SET_APP_STATE: (context, state) => context.commit('SET_APP_STATE', state),
  RESET_FILTERS: (context) => {
    context.dispatch('filters/RESET_FILTERS');
    context.dispatch(`${context.state.state}/RESET_FILTERS`);
  },
};

const mutations = {
  SET_APP_STATE: (state, appState) => {
    state.state = appState;
  },
};

export default createStore({
  state,
  actions,
  mutations,
  modules: {
    // filters,
    registry,
    dashboards,
    userinfo,
    appearance,
  },
});
