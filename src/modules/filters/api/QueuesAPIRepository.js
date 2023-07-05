import { QueueServiceApiFactory } from 'webitel-sdk';
import { SdkListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../app/api/old/instance';
import configuration from '../../../app/api/old/utils/openAPIConfig';

const queueService = new QueueServiceApiFactory(configuration, '', instance);

const listGetter = new SdkListGetterApiConsumer(queueService.searchQueue);

const getQueuesLookup = (params) => listGetter.getLookup(params);

const QueuesAPIRepository = {
  getLookup: getQueuesLookup,
};

export default QueuesAPIRepository;
