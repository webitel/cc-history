import APIRepository from '../../../../api/APIRepository';
import historyHeaders from '../utils/historyHeaders';
import { getDefaultFields } from '../utils/loadHistoryScripts';

const historyAPI = APIRepository.history;
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
  callId: null,
  itemInstance: {},
  data: [],
  headers: historyHeaders,
  isLoading: false,
};

const getters = {
  IS_CALL_ID: (state) => !!state.callId, // string id or null
  HEADERS: (state) => {
    const headers = [...state.headers, transfersHeader, transfersLegMarkerHeader];
    return headers;
  },
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
      fields: [
        'id',
        'parent_id',
        ...getDefaultFields(context.state.headers),
        'transfer_from',
        'transfer_to',
      ],
      parentId: state.callId,
      from: 0, // get All
      to: Date.now(),
      size: 100,
      skipParent: false,
    };
    return query;
  },

  SET_OPENED_CALL: (context, item) => {
    const callId = item.id;
    context.commit('SET_CALL', item);
    context.commit('SET_CALL_ID', callId);
  },

  RESET_OPENED_CALL: (context) => {
    context.commit('RESET_CALL_ID');
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

  SET_CALL: (state, itemInstance) => {
    state.itemInstance = itemInstance;
  },

  SET_CALL_ID: (state, callId) => {
    state.callId = callId;
  },

  RESET_CALL_ID: (state) => {
    state.callId = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
