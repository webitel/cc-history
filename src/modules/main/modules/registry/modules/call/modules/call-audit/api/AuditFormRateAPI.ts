import applyTransform, {
	camelToSnake,
	notify,
	snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { AuditFormServiceApiFactory, EngineAuditRate } from 'webitel-sdk';

import instance from '../../../../../../../../../app/api/instance';
import configuration from '../../../../../../../../../app/api/openAPIConfig';
import { responseItemHandler } from './_shared/utils';

const auditService = AuditFormServiceApiFactory(configuration, '', instance);

const fillAnswersCreatedAtFromRate = (rate: EngineAuditRate) => ({
	...rate,
	answers: rate.answers.map((answer) => ({
		...answer,
		createdAt: rate.createdAt,
	})),
});

const getAuditFormRate = async (rateId: EngineAuditRate['id']) => {
	try {
		const response = await auditService.readAuditRate(rateId);
		return applyTransform(response.data, [
			snakeToCamel(),
			responseItemHandler,
			fillAnswersCreatedAtFromRate,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addAuditFormRate = async (itemInstance: EngineAuditRate) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
	]);
	try {
		const response = await auditService.createAuditFormRate(item);
		return applyTransform(response.data, [
			snakeToCamel(),
			responseItemHandler,
			fillAnswersCreatedAtFromRate,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateAuditFormRate = async ({
	itemId,
	itemInstance,
}: {
	itemId: EngineAuditRate['id'];
	itemInstance: EngineAuditRate;
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
	]);
	try {
		const response = await auditService.updateAuditRate(itemId, item);
		return applyTransform(response.data, [
			snakeToCamel(),
			responseItemHandler,
			fillAnswersCreatedAtFromRate,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteAuditFormRate = async (rateId: EngineAuditRate['id']) => {
	try {
		await auditService.deleteAuditRate(rateId);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const AuditFormRateAPI = {
	get: getAuditFormRate,
	add: addAuditFormRate,
	update: updateAuditFormRate,
	delete: deleteAuditFormRate,
};

export {
	addAuditFormRate,
	deleteAuditFormRate,
	getAuditFormRate,
	updateAuditFormRate,
};

export default AuditFormRateAPI;
