import { QueueServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  merge,
  mergeEach,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../app/api/instance';
import configuration from '../../../app/api/openAPIConfig';

const queueService = new QueueServiceApiFactory(configuration, '', instance);

// const listGetter = new SdkListGetterApiConsumer(queueService.searchQueue);
const getQueueList = async (params) => {
  const fieldsToSend = [
    'page',
    'size',
    'search',
    'sort',
    'fields',
    'id',
  ];
  const defaultObject = {
    enabled: false,
  };

  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    sanitize(fieldsToSend),
  ]);

  try {
    const response = await queueService.searchQueue(
      page,
      size,
      search,
      sort,
      fields,
      id,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getQueuesLookup = (params) => getQueueList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const QueuesAPIRepository = {
  getLookup: getQueuesLookup,
};

export default QueuesAPIRepository;
