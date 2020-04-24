import { getHistory } from '../../../api/history/history';

const state = {
  data: [],
};
const getters = {
  SELECTED_DATA: (state) => state.data.filter((item) => item._isSelected),
};
const actions = {
  LOAD_DATA_LIST: async (context, params) => {
    const { items, next } = await getHistory(params);
    context.commit('SET_DATA_LIST', items);
    return next;
  },
};
const mutations = {
  SET_DATA_LIST: (state, data) => {
    state.data = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
