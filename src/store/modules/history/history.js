import deepCopy from 'deep-copy';
import APIRepository from '../../../api/APIRepository';
import historyHeaders from './utils/historyHeaders';
import router from '../../../router';
import { convertQuery, getHeadersFields } from './utils/loadHistoryScripts';
import openedCall from './opened-call/opened-call';

const historyAPI = APIRepository.history;
const REQUIRED_DATA_FIELDS = ['files', 'id'];

const state = {
  data: [],
  headers: historyHeaders,
  isLoading: false,
  isNext: false,
};

const getters = {
  SELECTED_DATA_ITEMS: (state) => state.data.filter((item) => item._isSelected),

  DATA_FIELDS: () => {
    let fields = getHeadersFields(state.headers);
    fields = [...REQUIRED_DATA_FIELDS, ...fields];
    return fields;
  },
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

  FETCH_DOWNLOAD_LIST: async (context, additionalParams) => {
    const queryParams = await context.getters.GET_REQUEST_PARAMS;
    const params = {
      ...queryParams,
      ...additionalParams,
    };
    return historyAPI.getHistory(params);
  },

  GET_REQUEST_PARAMS: (context) => {
    const routeQuery = deepCopy(router.currentRoute.query);
    const query = convertQuery(routeQuery);
    query.fields = context.getters.DATA_FIELDS;
    query.skipParent = true;
    return query;
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
    'opened-call': openedCall,
  },
};
