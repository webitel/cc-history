import { QueueServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import {
  formatOptions,
  PAGE,
  SIZE,
  FIELDS,
} from './defaults/defaults';

const queueService = new QueueServiceApiFactory(configuration, '', instance);

export const fetchQueues = async (search = '') => {
  try {
    const response = await queueService.searchQueue(
      PAGE,
      SIZE,
      search,
      undefined,
      FIELDS,
    );
    return formatOptions(response);
  } catch (err) {
    throw err;
  }
};

export const getSelectedQueues = async (idList) => {
  const size = idList.length;
  try {
    const response = await queueService.searchQueue(
      PAGE,
      size,
      null,
      undefined,
      FIELDS,
      null,
      idList,
    );
    return formatOptions(response);
  } catch (err) {
    throw err;
  }
};
