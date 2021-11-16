import { AgentServiceApiFactory } from 'webitel-sdk';
import { SdkListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../api/instance';
import configuration from '../../../api/utils/openAPIConfig';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const listGetter = new SdkListGetterApiConsumer(agentService.searchAgent);

const getAgentsLookup = (params) => listGetter.getLookup(params);

const AgentsAPIRepository = {
  getLookup: getAgentsLookup,
};

export default AgentsAPIRepository;
