import { QueueServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import { formatOptions, PAGE, SIZE } from './defaults/defaults';

const queueService = new QueueServiceApiFactory(configuration, '', instance);

const fetchQueues = async (search = '') => {
  try {
    const response = await queueService.searchQueue(PAGE, SIZE, search);
    return formatOptions(response.items);
  } catch (err) {
    throw err;
  }
};

export default {
  fetchQueues,
};
