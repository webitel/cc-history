import getHistory from '../../../api/history/history';
import historyHeaders from './utils/historyHeaders';
import router from '../../../router';
import { convertQuery, getDefaultFields } from './utils/loadHistoryScripts';
import childrenCalls from './children-calls/children-calls';

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
    const params = await context.dispatch('GET_QUERY_PARAMS');
    try {
      const { items, next } = await getHistory(params);
      context.commit('SET_DATA_LIST', items);
      context.commit('SET_NEXT_PAGE', next);
    } catch {
    } finally {
      context.commit('SET_LOADING', false);
    }
  },

  SET_HEADERS: (context, headers) => {
    context.commit('SET_HEADERS', headers);
  },

  GET_QUERY_PARAMS: (context) => {
    let { query } = router.currentRoute;
    if (!query.fields) {
      const fields = getDefaultFields(context.state.headers);
      // do not mutate $route: reassign variable instead of query.fields=
      query = { ...query, fields };
    }
    return convertQuery(query);
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
