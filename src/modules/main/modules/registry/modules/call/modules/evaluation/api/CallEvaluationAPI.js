import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  handleUnauthorized,
  merge, mergeEach, notify, sanitize, log, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import { AuditFormServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../../../app/api/instance';
import configuration from '../../../../../../../../../app/api/openAPIConfig';
import deepCopy from 'deep-copy';

const auditService = new AuditFormServiceApiFactory(configuration, '', instance);

// const _getScorecardsLookup = (getList) => function ({
//     page,
//     size,
//     search,
//     sort,
//     fields,
//     enabled,
//     active,
//   }) {
//   const params = [
//     page,
//     size,
//     search,
//     sort,
//     fields,
//     undefined,
//     undefined,
//     enabled,
//     undefined,
//     undefined,
//     active,
//   ];
//   return getList(params);
// };

// const listGetter = new SdkListGetterApiConsumer(auditService.searchAuditForm)
//   .setGetListMethod(_getScorecardsLookup);

const getScorecards = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields,
    enabled,
    active,
    id,
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
      id,
      undefined,
      enabled,
      undefined,
      undefined,
      active,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
      log,
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

// const sendAuditResult = (params) => auditService.createAuditFormRate(params);
const sendAuditResult = async ({ itemInstance }) => {
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

// const getResult = (id) => (auditService.readAuditRate(id));

const getResult = async ({ itemId: id }) => {
  console.log('getResult id:', id);
  try {
    console.log('getResult id:', id);
    const response = await auditService.readAuditRate(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      log,
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
