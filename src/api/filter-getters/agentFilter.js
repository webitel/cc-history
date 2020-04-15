import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import { PAGE, SIZE } from './defaults/defaults';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

// eslint-disable-next-line import/prefer-default-export
export const fetchAgents = async (search = '') => {
  try {
    const response = await agentService.searchAgent(PAGE, SIZE, search);
    // NAME -> USER.NAME
    if (response.items) {
      return response.items.map((item) => ({
        name: item.user.name,
        id: item.id,
      }));
    }
    return [];
  } catch (err) {
    throw err;
  }
};
