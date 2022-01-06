import { sortToQueryAdapter } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import APIRepository from '../../../api/APIRepository';
import historyHeaders from './headers/historyHeaders';
import openedCall from './opened-call/opened-call';
import filters from './filters/filters';

const historyAPI = APIRepository.history;
const REQUIRED_DATA_FIELDS = ['files', 'id'];

const state = {
  dataList: [],
  headers: historyHeaders,
  isLoading: false,
  isNext: false,
};

const getters = {
  FILTERS: (state, getters, rootState, rootGetters) => {
    const globalFilters = rootGetters['filters/GET_FILTERS'];
    const registryFilters = rootGetters['registry/filters/GET_FILTERS'];
    return {
      ...globalFilters,
      ...registryFilters,
      fields: getters.DATA_FIELDS,
      sort: getters.DATA_SORT,
      skipParent: true,
    };
  },
  SELECTED_DATA_ITEMS: (state) => state.dataList.filter((item) => item._isSelected),

  DATA_SORT: (state) => {
    const header = state.headers.find((header) => header.sort);
    return header ? `${sortToQueryAdapter(header.sort) + header.field}` : null;
  },

  DATA_FIELDS: (state) => {
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
    const query = context.getters.FILTERS;
    try {
      const { items, next } = await historyAPI.getHistory(query);
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
  modules: {
    filters,
    'opened-call': openedCall,
  },
};
