import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../utils/openAPIConfig';
import { formatOptions, defaultParams } from './defaults/defaults';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

export const fetchAgents = async ({
                                    page,
                                    size,
                                    search,
                                    fields,
                                    id,
                                  }) => {
  try {
    const response = await agentService.searchAgent(
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

const AgentsAPIRepository = {
  getAgents(argParams) {
    const params = {
      ...defaultParams,
      ...argParams,
    };
    return fetchAgents(params);
  },
  getAgentsByIds(idList) {
    const params = {
      ...defaultParams,
      size: idList.length,
      id: idList,
    };
    return fetchAgents(params);
  },
};

export default AgentsAPIRepository;