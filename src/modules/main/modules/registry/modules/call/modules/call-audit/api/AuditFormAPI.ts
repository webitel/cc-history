import { AuditFormsAPI } from '@webitel/api-services/api';

import {
	questionDefaultValuesHandler,
	responseItemHandler,
} from './_shared/utils';

const listHandler = (items) =>
	items.map((item) => ({
		...item,
		questions: questionDefaultValuesHandler(item.questions),
	}));

const getAuditFormsList = async (params) => {
	const response = await AuditFormsAPI.getList(params);
	return {
		...response,
		items: listHandler(response.items),
	};
};

const getAuditForm = async (params) => {
	const response = await AuditFormsAPI.get(params);
	return responseItemHandler(response);
};

const getAuditLookup = async (params) => {
	const response = await AuditFormsAPI.getLookup(params);
	return {
		...response,
		items: listHandler(response.items),
	};
};

const AuditFormAPI = {
	getList: getAuditFormsList,
	get: getAuditForm,
	getLookup: getAuditLookup,
};

export { getAuditForm, getAuditFormsList, getAuditLookup };

export default AuditFormAPI;
