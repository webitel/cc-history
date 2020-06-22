import deepCopy from 'deep-copy';
import APIRepository from '../../../api/APIRepository';
import historyHeaders from './utils/historyHeaders';
import router from '../../../router';
import { convertQuery, getDefaultFields } from './utils/loadHistoryScripts';
import childrenCalls from './children-calls/children-calls';

const historyAPI = APIRepository.history;

const state = {
  data: [],
  headers: historyHeaders,
  isLoading: false,
  isNext: false,
};

const getters = {
  SELECTED_DATA: (state) => state.data.filter((item) => item._isSelected),
};

const actions = {
  LOAD_DATA_LIST: async (context) => {
    context.commit('SET_LOADING', true);
    const params = await context.dispatch('GET_REQUEST_PARAMS');
    try {
      const { items, next } = await historyAPI.getHistory(params);
      context.commit('SET_DATA_LIST', items);
      context.commit('SET_NEXT_PAGE', next);
    } catch {
    } finally {
      context.commit('SET_LOADING', false);
    }
  },

  GET_HISTORY_LIST: async (context, additionalParams) => {
    const queryParams = await context.dispatch('GET_REQUEST_PARAMS');
    const params = {
      ...queryParams,
      ...additionalParams,
    };
      return historyAPI.getHistory(params);
  },

  SET_HEADERS: (context, headers) => {
    context.commit('SET_HEADERS', headers);
  },

  GET_REQUEST_PARAMS: (context) => {
    const routeQuery = deepCopy(router.currentRoute.query);
    const query = convertQuery(routeQuery);
    if (!query.fields) query.fields = getDefaultFields(context.state.headers);
    query.skipParent = true;
    return query;
  },
};
const mutations = {
  SET_DATA_LIST: (state, data) => {
    state.data = data;
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
    'children-calls': childrenCalls,
  },
};
