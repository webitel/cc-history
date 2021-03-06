const defaultState = () => ({
  domainId: 0,
  name: '',
  username: '',
  account: '',
  userId: 0,
  scope: [],
  roles: [],
  license: [],
  language: localStorage.getItem('lang'),
});

const state = {
  ...defaultState(),
};

const getters = {};

const actions = {
  SET_SESSION: (context, session) => {
    context.dispatch('RESET_STATE');
    context.commit('SET_SESSION', session);
  },

  RESET_STATE: (context) => {
    context.commit('RESET_STATE');
  },
};

const mutations = {
  SET_SESSION: (state, session) => {
    state.domainId = session.dc;
    state.account = session.preferredUsername;
    state.roles = session.roles;
    state.scope = session.scope;
    state.userId = session.userId;
    state.license = session.license;
    state.username = session.username;
    state.name = session.name;
  },

  RESET_STATE: (state) => {
    Object.assign(state, defaultState());
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
