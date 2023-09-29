import applyTransform, {
  log,
  merge,
  starToSearch,
  camelToSnake,
  snakeToCamel,
  notify,
  sanitize,
} from '@webitel/ui-sdk/src/api/transformers';
import {
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import { ContactsApiFactory } from 'webitel-sdk';
import configuration from '../../../app/api/openAPIConfig';
import instance from '../../../app/api/instance';

const service = new ContactsApiFactory(configuration, '', instance);

const getList = async (params) => {
  const fieldsToSend = ['page', 'size', 'search', 'sort', 'fields', 'id', 'qin'];

  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
    qin,
  } = applyTransform(params, [
    sanitize(fieldsToSend),
    merge(getDefaultGetParams()),
    starToSearch('search'),
    camelToSnake(),
  ]);
  try {
    const response = await service.searchContacts(
      page,
      size,
      search,
      sort || '+name',
      fields,
      id,
      qin,
    );
    const { data, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge({ data: [], next: false }),
    ]);
    return {
      items: applyTransform(data, []),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getLookup = async (params) => {
  const { items, next } = await getList({ fields: ['id', 'name'], ...params });
  // need to format name: { commonName } -> { id, name }
  return {
    items: applyTransform(items, [
      (items) => items.map(({ name, id }) => ({ id, name: name.commonName })),
    ]),
    next,
  };
};

export default {
  getList,
  getLookup,
};
