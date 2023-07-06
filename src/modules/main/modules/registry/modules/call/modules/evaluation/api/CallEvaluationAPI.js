import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  handleUnauthorized,
  merge, notify, log, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import { AuditFormServiceApiFactory, EngineAuditQuestionType } from 'webitel-sdk';
import instance from '../../../../../../../../../app/api/instance';
import configuration from '../../../../../../../../../app/api/openAPIConfig';

const auditService = new AuditFormServiceApiFactory(configuration, '', instance);

const getScorecards = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields,
    enabled,
    active,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await auditService.searchAuditForm(
      page,
      size,
      search,
      sort,
      fields,
      undefined,
      undefined,
      enabled,
      undefined,
      undefined,
      active,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const sendAuditResult = async (itemInstance) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
  ]);
  try {
    const response = await auditService.createAuditFormRate(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const getResult = async (id) => {
  try {
    const response = await auditService.readAuditRate(id);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const getAuditLookup = (params) => getScorecards({
 ...params,
 fields: params.fields || ['id', 'name'],
});

const CallEvaluationAPI = {
  getLookup: getAuditLookup,
  sendAuditResult,
  getResult,
};

export default CallEvaluationAPI;
