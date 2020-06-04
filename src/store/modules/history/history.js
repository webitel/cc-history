import { getHistory } from '../../../api/history/history';
import historyHeaders from './utils/historyHeaders';

const state = {
  data: [],
  headers: historyHeaders,
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
  SET_HEADERS: (context, headers) => {
    context.commit('SET_HEADERS', headers);
  },
};
const mutations = {
  SET_DATA_LIST: (state, data) => {
    state.data = data;
  },
  SET_HEADERS: (state, headers) => {
    state.headers = headers;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
