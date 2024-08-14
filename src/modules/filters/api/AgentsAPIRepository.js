import { AgentServiceApiFactory } from 'webitel-sdk';
import applyTransform, {
  merge, notify,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { getDefaultGetListResponse, getDefaultGetParams } from '@webitel/ui-sdk/src/api/defaults/index.js';
import instance from '../../../app/api/instance';
import configuration from '../../../app/api/openAPIConfig';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const getAgentList = async (params) => {
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
  ]);

  try {
    const response = await agentService.searchAgent(
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
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getAgentsLookup = (params) => getAgentList({
   ...params,
   fields: params.fields || ['id', 'name'],
  });

const AgentsAPIRepository = {
  getLookup: getAgentsLookup,
};

export default AgentsAPIRepository;
