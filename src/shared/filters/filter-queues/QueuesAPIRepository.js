import { QueueServiceApiFactory } from 'webitel-sdk';
import instance from '../../../api/instance';
import configuration from '../../../api/utils/openAPIConfig';
import { formatOptions, defaultParams } from '../api/defaults/defaults';

const queueService = new QueueServiceApiFactory(configuration, '', instance);

export const fetchQueues = async ({
                                    page,
                                    size,
                                    search,
                                    fields,
                                    id,
                                  }) => {
  try {
    // eslint-disable-next-line no-param-reassign
    if (search && search.slice(-1) !== '*') search += '*';
    const response = await queueService.searchQueue(
      page,
      size,
      search,
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
