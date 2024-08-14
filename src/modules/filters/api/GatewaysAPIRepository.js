import applyTransform, {
  merge,
  starToSearch,
  camelToSnake,
  snakeToCamel,
  notify,
  sanitize, generateUrl,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import instance from '../../../app/api/instance';

const baseUrl = '/sip/gateways';

const getList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(baseUrl),
  ]);

  try {
    const response = await instance.get(url);
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
      notify,
    ]);
  }
};

const getGatewaysLookup = (params) => getList({
   ...params,
   fields: params.fields || ['id', 'name'],
 });

const GatewaysAPIRepository = {
  getLookup: getGatewaysLookup,
};

export default GatewaysAPIRepository;
