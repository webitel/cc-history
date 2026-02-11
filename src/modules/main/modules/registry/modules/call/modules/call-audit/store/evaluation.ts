import BaseStoreModule from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule';
import { EngineAuditRate } from 'webitel-sdk';

import AuditFormRateAPI from '../api/AuditFormRateAPI';

const state = {
	result: {}, // todo: rename to auditRate
	isEvaluationLoading: false,
};

const actions = {
	// todo: rename "evaluation" -> "audit rate"
	GET_EVALUATION: async (context, id) => {
		context.commit('SET_LOADING', true);
		try {
			const result = await AuditFormRateAPI.get(id);
			context.commit('SET_RESULT', result);
		} finally {
			context.commit('SET_LOADING', false);
		}
	},
	// todo: rename "evaluation" -> "audit rate"
	ADD_EVALUATION: async (context, evaluation: EngineAuditRate) => {
		context.commit('SET_LOADING', true);
		try {
			const result = await AuditFormRateAPI.add(evaluation);
			context.commit('SET_RESULT', result);
		} finally {
			context.commit('SET_LOADING', false);
		}
	},
	// todo: rename "evaluation" -> "audit rate"
	UPDATE_EVALUATION: async (context, itemInstance: EngineAuditRate) => {
		context.commit('SET_LOADING', true);
		try {
			const result = await AuditFormRateAPI.update({
				itemId: context.state.result.id,
				itemInstance,
			});
			context.commit('SET_RESULT', result);
		} finally {
			context.commit('SET_LOADING', false);
		}
	},
	// todo: rename "evaluation" -> "audit rate"
	DELETE_EVALUATION: async (context, { id } = {}) => {
		const rateId = id || context.state.result.id;
		context.commit('SET_LOADING', true);
		try {
			await AuditFormRateAPI.delete(rateId);
			await context.dispatch('RESET_EVALUATION_RESULT');
		} finally {
			context.commit('SET_LOADING', false);
		}
	},
	// todo: rename "evaluation" -> "audit rate"
	RESET_EVALUATION_RESULT: (context, payload) =>
		context.commit('RESET_EVALUATION_RESULT', payload),
};

const mutations = {
	SET_RESULT: (state, result) => {
		state.result = result;
	},
	SET_LOADING: (state, value) => {
		state.isEvaluationLoading = value;
	},
	RESET_EVALUATION_RESULT: (state) => {
		state.result = {};
	},
};

const evaluation = new BaseStoreModule().getModule({
	state,
	actions,
	mutations,
});

export default evaluation;
