import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import { formatOptions, PAGE, SIZE } from './defaults/defaults';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const fetchAgents = async (search = '') => {
  try {
    const response = await agentService.searchAgent(PAGE, SIZE, search);
    return formatOptions(response.items);
  } catch (err) {
    throw err;
  }
};

export default {
  fetchAgents,
};
