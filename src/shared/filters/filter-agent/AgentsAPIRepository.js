import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../../api/instance';
import configuration from '../../../api/utils/openAPIConfig';
import { formatOptions, defaultParams } from '../api/defaults/defaults';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

export const fetchAgents = async ({
                                      page,
                                      size,
                                      search,
                                      fields,
                                      id,
                                  }) => {
    try {
        // eslint-disable-next-line no-param-reassign
        if (search && search.slice(-1) !== '*') search += '*';
        const response = await agentService.searchAgent(
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
