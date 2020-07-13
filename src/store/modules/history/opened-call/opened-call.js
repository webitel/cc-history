import APIRepository from '../../../../api/APIRepository';
import { getHeadersFields } from '../utils/loadHistoryScripts';

const historyAPI = APIRepository.history;
const REQUIRED_MAIN_CALL_FIELDS = [
  'variables',
  'has_children',
];
const REQUIRED_DATA_FIELDS = [
  'id',
  'parent_id',
  'transfer_from',
  'transfer_to',
];

const transfersHeader = {
  text: () => '',
  value: 'transfers',
  show: true,
  sort: null,
  field: 'transfer_from, transfer_to',
  width: 'minmax(120px, 1fr)',
};
const transfersLegMarkerHeader = {
  text: () => '',
  value: 'legMarker',
  show: true,
  sort: null,
  field: '',
  width: '0',
};

const state = {
  mainCallId: null,
  mainCall: {},
  legsData: [],
  isLoading: false,
  isLegsDataLoading: false,
};

const getters = {
  IS_CALL_ID: (state) => !!state.mainCallId, // string id or null
  SELECTED_DATA_ITEMS: (state) => state.legsData.filter((item) => item._isSelected),
  HEADERS: (state, getters, rootState) => (
    [...rootState.history.headers, transfersHeader, transfersLegMarkerHeader]
  ),

  GET_REQUEST_PARAMS: (state, getters) => {
    const query = {
      fields: getters.DATA_FIELDS,
      dependencyId: state.mainCallId,
      from: 0, // get All
      to: Date.now(),
      size: 100,
      skipParent: false,
    };
    return query;
  },

  GET_MAIN_CALL_REQUEST_PARAMS: (state, getters) => {
    const query = {
      fields: getters.MAIN_CALL_FIELDS,
      from: 0, // get All
      to: Date.now(),
      ids: [state.mainCallId],
    };
    return query;
  },

  DATA_FIELDS: (state, getters, rootState) => {
    let fields = getHeadersFields(rootState.history.headers);
    fields = [...REQUIRED_DATA_FIELDS, ...fields];
    return fields;
  },

  MAIN_CALL_FIELDS: (state, getters) => {
    const fields = [...REQUIRED_MAIN_CALL_FIELDS, ...getters.DATA_FIELDS];
    return fields;
  },
};

const actions = {
  LOAD_LEGS_DATA_LIST: async (context) => {
    context.commit('SET_LEGS_DATA_LOADING', true);
    const params = await context.getters.GET_REQUEST_PARAMS;
    try {
      const { items } = await historyAPI.getHistory(params);
      context.commit('SET_LEGS_DATA_LIST', items);
    } catch {
    } finally {
      context.commit('SET_LEGS_DATA_LOADING', false);
    }
  },

  LOAD_MAIN_CALL: async (context) => {
    context.commit('SET_LOADING', true);
    const params = await context.getters.GET_MAIN_CALL_REQUEST_PARAMS;
    try {
      const { items } = await historyAPI.getHistory(params);
      const mainCall = items[0];
      context.commit('SET_MAIN_CALL', mainCall);
    } catch {
    } finally {
      context.commit('SET_LOADING', false);
    }
  },

  FETCH_DOWNLOAD_LIST: async (context) => {
    const items = [context.state.mainCall, ...context.state.legsData];
    return { items };
  },

  SET_OPENED_CALL: async (context, item) => {
    const mainCallId = item.id;
    context.commit('SET_CALL_ID', mainCallId);
    await context.dispatch('LOAD_MAIN_CALL', item);
  },

  RESET_OPENED_CALL: (context) => {
    context.commit('RESET_CALL_ID');
    context.commit('RESET_MAIN_CALL');
    context.commit('RESET_LEGS_DATA_LIST');
  },
};
const mutations = {
  SET_MAIN_CALL: (state, mainCall) => {
    state.mainCall = mainCall;
  },

  RESET_MAIN_CALL: (state) => {
    state.mainCall = {};
  },

  SET_LEGS_DATA_LIST: (state, legsData) => {
    state.legsData = legsData;
  },

  RESET_LEGS_DATA_LIST: (state) => {
    state.legsData = [];
  },

  SET_LOADING: (state, isLoading) => {
    state.isLoading = isLoading;
  },

  SET_LEGS_DATA_LOADING: (state, isLoading) => {
    state.isLegsDataLoading = isLoading;
  },

  SET_CALL_ID: (state, mainCallId) => {
    state.mainCallId = mainCallId;
  },

  RESET_CALL_ID: (state) => {
    state.mainCallId = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
