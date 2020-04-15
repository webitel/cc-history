import { QueueServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import { formatOptions, PAGE, SIZE } from './defaults/defaults';

const queueService = new QueueServiceApiFactory(configuration, '', instance);

// eslint-disable-next-line import/prefer-default-export
export const fetchQueues = async (search = '') => {
  try {
    const response = await queueService.searchQueue(PAGE, SIZE, search);
    return formatOptions(response);
  } catch (err) {
    throw err;
  }
};
