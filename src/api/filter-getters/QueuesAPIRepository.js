import { QueueServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../utils/openAPIConfig';
import { formatOptions, defaultParams } from './defaults/defaults';

const queueService = new QueueServiceApiFactory(configuration, '', instance);

export const fetchQueues = async ({
                                    page,
                                    size,
                                    search,
                                    fields,
                                    id,
                                  }) => {
  try {
    const response = await queueService.searchQueue(
      page,
      size,
      `${search}*`,
      undefined,
      fields,
      null,
      id,
    );
    return formatOptions(response);
  } catch (err) {
    throw err;
  }
};

const QueuesAPIRepository = {
  getQueues(argParams) {
    const params = {
      ...defaultParams,
      ...argParams,
    };
    return fetchQueues(params);
  },
  getQueuesByIds(idList) {
    const params = {
      ...defaultParams,
      size: idList.length,
      id: idList,
    };
    return fetchQueues(params);
  },
};

export default QueuesAPIRepository;
