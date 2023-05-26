import BaseStoreModule from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule';
import evaluation from '../modules/evaluation/store/evaluation';
import APIRepository from '../../../../../../../app/api/APIRepository';

const historyAPI = APIRepository.history;
const annotationsAPI = APIRepository.annotations;
const REQUIRED_MAIN_CALL_FIELDS = ['variables', 'has_children', 'agent_description', 'files', 'files_job', 'transcripts', 'direction', 'from', 'to', 'destination', 'hold', 'amd_ai_logs', 'amd_result', 'rate_id', 'allow_evaluation'];
const REQUIRED_DATA_FIELDS = ['id', 'parent_id', 'transfer_from', 'transfer_to'];

const transfersHeader = {
  value: 'transfers', show: true, sort: null, field: 'transfer_from, transfer_to',
};
const transfersLegMarkerHeader = {
  value: 'legMarker', show: true, sort: null, field: '', width: '0',
};

const state = {
  mainCallId: null,
  mainCall: {},
  mainCallAnnotations: [],
  fileId: null,
  legsData: [],
  isLoading: false,
  isLegsDataLoading: false,

  selectedRecordingFile: {},
};

const getters = {
  HEADERS: (state, getters, rootState) => (
    [...rootState.registry.headers, transfersHeader, transfersLegMarkerHeader]
  ),

  GET_REQUEST_PARAMS: (state, getters) => ({
    fields: getters.DATA_FIELDS,
    dependencyId: state.mainCallId,
    from: 0, // get All
    to: 0,
    size: 100,
    skipParent: false,
  }),

  GET_MAIN_CALL_REQUEST_PARAMS: (state, getters) => (params = {}) => ({
    fields: [...REQUIRED_MAIN_CALL_FIELDS, ...getters.DATA_FIELDS],
    from: 0, // get All
    to: Date.now(),
    id: [state.mainCallId],
    ...params,
  }),

  DATA_FIELDS: (state, getters, rootState) => {
    let fields = rootState.registry.headers
      .filter((header) => header.show)
      .map((header) => header.field);
    fields = [...new Set([...REQUIRED_DATA_FIELDS, ...fields])];
    return fields;
  },

  RECORDING_FILE_SELECT_OPTIONS: (state) => state.mainCall.files
      || (state.mainCall.transcripts || state.mainCall.filesJob) || []
        .map(({ id }) => ({ id, name: id })),
};

const actions = {
  LOAD_LEGS_DATA_LIST: async (context) => {
    context.commit('SET_LEGS_DATA_LOADING', true);
    const params = await context.getters.GET_REQUEST_PARAMS;
    try {
      const { items } = await historyAPI.getHistory(params);
      context.commit('SET_LEGS_DATA_LIST', items);
    } catch (err) {
      context.commit('SET_LEGS_DATA_LIST', []);
      throw err;
    } finally {
      context.commit('SET_LEGS_DATA_LOADING', false);
    }
  },

  LOAD_MAIN_CALL: async (context) => {
    context.commit('SET_LOADING', true);
    const params = await context.getters.GET_MAIN_CALL_REQUEST_PARAMS();
    try {
      const { items } = await historyAPI.getHistory(params);
      const mainCall = items[0];
      context.commit('SET_MAIN_CALL', mainCall);
      if (!state.fileId && mainCall.files) {
        await context.dispatch('SET_FILE_ID', mainCall.files[0].id);
      }
      if (context.getters.RECORDING_FILE_SELECT_OPTIONS) {
        // we should initialize recording file before opening "call visualization" tab
        // so that player would initialize correctly
        await context.dispatch('INITIALIZE_RECORDING_FILE');
      }
    } catch (err) {
      throw err;
    } finally {
      context.commit('SET_LOADING', false);
    }
  },

  LOAD_MAIN_CALL_ANNOTATIONS: async (context, query = {}) => {
    const params = await context.getters.GET_MAIN_CALL_REQUEST_PARAMS(query);
    params.fields = ['annotations'];
    try {
      const { items } = await historyAPI.getHistory(params);
      const { annotations } = items[0];
      context.commit('SET_MAIN_CALL_ANNOTATIONS', annotations);
    } catch (err) {
      throw err;
    }
  },

  SET_FILE_ID: (context, fileId) => {
    context.commit('SET_FILE_ID', fileId);
  },

  SET_OPENED_CALL: async (context, item) => {
    const mainCallId = item.id;
    context.commit('SET_CALL_ID', mainCallId);
    await context.dispatch('LOAD_MAIN_CALL', item);
  },

  RESET_OPENED_CALL: async (context) => {
    context.commit('RESET_CALL_ID');
    context.commit('RESET_MAIN_CALL');
    context.commit('RESET_FILE_ID');
    context.commit('RESET_LEGS_DATA_LIST');
    await context.dispatch('SET_RECORDING_FILE', {});
    await context.dispatch('evaluation/RESET_EVALUATION_RESULT');
  },

  ADD_ANNOTATION: async (context, annotation) => (
    annotationsAPI.add({ itemInstance: annotation })
  ),
  EDIT_ANNOTATION: async (context, annotation) => (
    annotationsAPI.update({ itemInstance: annotation })
  ),
  DELETE_ANNOTATION: async (context, annotation) => (
    annotationsAPI.delete({ itemInstance: annotation })
  ),

  INITIALIZE_RECORDING_FILE: (context) => context.dispatch('SET_RECORDING_FILE', context.getters.RECORDING_FILE_SELECT_OPTIONS[0]),
  SET_RECORDING_FILE: (context, file) => context.commit('SET_RECORDING_FILE', file),
};

const mutations = {
  SET_MAIN_CALL: (state, mainCall) => {
    state.mainCall = mainCall;
  },
  SET_MAIN_CALL_ANNOTATIONS: (state, annotations) => {
    state.mainCallAnnotations = annotations;
  },

  SET_FILE_ID: (state, fileId) => {
    state.fileId = fileId;
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
  RESET_FILE_ID: (state) => {
    state.fileId = null;
  },

  SET_RECORDING_FILE: (state, file) => {
    state.selectedRecordingFile = file;
  },
};

const call = new BaseStoreModule()
  .setChildModules({ evaluation })
  .getModule({
 state, getters, actions, mutations,
});

export default call;
