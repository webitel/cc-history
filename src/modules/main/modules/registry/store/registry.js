  import { sortToQueryAdapter } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import APIRepository from '../../../../../app/api/APIRepository';
// import historyHeaders from './headers/headers';
import call from '../modules/call/store/call';

const variablesHeaders = JSON.parse(localStorage.getItem('variablesKeysList'));

/* NOTE: if there is any variablesHeaders in localStorage,
 add them to historyHeaders to show them in history table after refresh
 */
if (variablesHeaders) {
  variablesHeaders.forEach((item) => {
    // historyHeaders.push(item);
  });
}

const historyAPI = APIRepository.history;
const REQUIRED_DATA_FIELDS = ['files', 'id', 'files_job', 'transcripts'];

const state = {
  dataList: [],
  headers: [],
  isLoading: false,
  page: 1,
  size: 10,
  isNext: false,
};

const getters = {
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
    /*
      https://my.webitel.com/browse/WTEL-3560
      preventively disable isNext to handle case when user is clicking
       "next" faster than actual request is made
     */
    context.commit('SET_NEXT_PAGE', false);

    context.commit('SET_LOADING', true);
    const query = context.rootGetters['filters/GET_FILTERS'];
    const params = {
      ...query,
      sort: context.getters.DATA_SORT,
      fields: context.getters.DATA_FIELDS,
      page: context.state.page,
      size: context.state.size,
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
  SET_PAGE: (context, page) => {
    context.commit('SET_PAGE', +page);
  },
  SET_SIZE: (context, size) => {
    if (size) context.commit('SET_SIZE', +size);
  },
  RESET_FILTERS: (context) => {
    context.dispatch('SET_PAGE', 1);
    context.dispatch('SET_SIZE', 10);
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
  SET_PAGE: (state, page) => {
    state.page = page;
  },
  SET_SIZE: (state, size) => {
    state.size = size;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { call },
};
