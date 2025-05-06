import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
  merge,
  notify,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { AuditFormServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../../../app/api/instance';
import configuration from '../../../../../../../../../app/api/openAPIConfig';
import {
  questionDefaultValuesHandler,
  responseItemHandler,
} from './_shared/utils';

const auditService = AuditFormServiceApiFactory(configuration, '', instance);

const getAuditFormsList = async (params) => {
  const listHandler = (items) =>
    items.map((item) => ({
      ...item,
      questions: questionDefaultValuesHandler(item.questions),
    }));

  const { page, size, search, sort, fields, enabled, active } = applyTransform(
    params,
    [merge(getDefaultGetParams()), starToSearch('search')],
  );

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
      items: applyTransform(items, [listHandler]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getAuditForm = async ({ itemId: id }) => {
  try {
    const response = await auditService.readAuditForm(id);
    return applyTransform(response.data, [snakeToCamel(), responseItemHandler]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getAuditLookup = (params) =>
  getAuditFormsList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const AuditFormAPI = {
  getList: getAuditFormsList,
  get: getAuditForm,
  getLookup: getAuditLookup,
};

export { getAuditForm, getAuditFormsList, getAuditLookup };

export default AuditFormAPI;
