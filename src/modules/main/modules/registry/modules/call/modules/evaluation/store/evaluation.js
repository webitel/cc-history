import BaseStoreModule from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule';
import CallEvaluationAPI from '../api/CallEvaluationAPI';

const state = {
  evaluation: {},
  result: {},
  isEvalLoading: false,
};

const actions = {
  SEND_EVALUATION: async (context, evaluation) => {
    context.commit('SET_LOADING', true);
    try {
    const result = await CallEvaluationAPI.sendAuditResult(evaluation);
    context.commit('SET_RESULT', result);
    } finally {
      context.commit('SET_LOADING', false);
    }
  },
};

const mutations = {
  SET_RESULT: (state, result) => {
    state.result = result;
  },
  SET_LOADING: (state, bool) => {
    state.isEvalLoadingt = bool;
  },
};

const evaluation = new BaseStoreModule().getModule({
  state, actions, mutations,
                                                   });

export default evaluation;
