import APIRepository from '../../../api/APIRepository';
import historyHeaders from './headers/historyHeaders';
import router from '../../../router';
import openedCall from './opened-call/opened-call';

const historyAPI = APIRepository.history;
const REQUIRED_DATA_FIELDS = ['files', 'id'];

const state = {
  dataList: [],
  headers: historyHeaders,
  isLoading: false,
  isNext: false,
};

const getters = {
  SELECTED_DATA_ITEMS: (state) => state.dataList.filter((item) => item._isSelected),

  DATA_FIELDS: () => {
    let fields = state.headers
      .filter((header) => header.show)
      .map((header) => header.field);
    fields = [...new Set([...REQUIRED_DATA_FIELDS, ...fields])];
    return fields;
  },
};

const actions = {
  LOAD_DATA: (context, payload) => context.dispatch('LOAD_DATA_LIST', payload),

  LOAD_DATA_LIST: async (context) => {
    context.commit('SET_LOADING', true);
    const params = {
      ...router.currentRoute.query,
      fields: context.getters.DATA_FIELDS,
      skipParent: true,
    };
    try {
      const { items, next } = await historyAPI.getHistory(params);
      context.commit('SET_DATA_LIST', items);
      context.commit('SET_NEXT_PAGE', next);
    } catch (err) {
      context.commit('SET_DATA_LIST', []);
      context.commit('SET_NEXT_PAGE', false);
      throw err;
    } finally {
      context.commit('SET_LOADING', false);
    }
  },

  SET_HEADERS: (context, headers) => {
    context.commit('SET_HEADERS', headers);
  },
};
const mutations = {
  SET_DATA_LIST: (state, dataList) => {
    state.dataList = dataList;
  },
  SET_HEADERS: (state, headers) => {
    state.headers = headers;
  },
  SET_LOADING: (state, isLoading) => {
    state.isLoading = isLoading;
  },
  SET_NEXT_PAGE: (state, isNext) => {
    state.isNext = isNext;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { 'opened-call': openedCall },
};
