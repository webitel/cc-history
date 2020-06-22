import APIRepository from '../../../../api/APIRepository';
import historyHeaders from '../utils/historyHeaders';
import { getDefaultFields } from '../utils/loadHistoryScripts';

const historyAPI = APIRepository.history;

const state = {
  parentId: null,
  data: [],
  headers: historyHeaders,
  isLoading: false,
};

const getters = {
  IS_PARENT_ID: (state) => !!state.parentId, // string id or null
};

const actions = {
  LOAD_DATA_LIST: async (context) => {
    context.commit('SET_LOADING', true);
    const params = await context.dispatch('GET_REQUEST_PARAMS');
    try {
      const { items } = await historyAPI.getHistory(params);
      context.commit('SET_DATA_LIST', items);
    } catch {
    } finally {
      context.commit('SET_LOADING', false);
    }
  },

  GET_REQUEST_PARAMS: (context) => {
    const query = {
      fields: getDefaultFields(context.state.headers),
      parentId: state.parentId,
      from: 0, // get All
      to: Date.now(),
      size: 100,
      skipParent: false,
    };
    return query;
  },

  SET_PARENT_ID: (context, parentId) => {
    context.commit('SET_PARENT_ID', parentId);
  },

  RESET_PARENT_ID: (context) => {
    context.commit('RESET_PARENT_ID');
    context.commit('RESET_DATA_LIST');
  },
};
const mutations = {
  SET_DATA_LIST: (state, data) => {
    state.data = data;
  },
  RESET_DATA_LIST: (state) => {
    state.data = [];
  },
  SET_LOADING: (state, isLoading) => {
    state.isLoading = isLoading;
  },

  SET_PARENT_ID: (state, parentId) => {
    state.parentId = parentId;
  },

  RESET_PARENT_ID: (state) => {
    state.parentId = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
