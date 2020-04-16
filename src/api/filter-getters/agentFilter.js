import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import {
  formatOptions,
  PAGE,
  SIZE,
  FIELDS,
} from './defaults/defaults';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

export const fetchAgents = async (search = '') => {
  try {
    const response = await agentService.searchAgent(
      PAGE,
      SIZE,
      search,
      undefined,
      FIELDS,
    );
    formatOptions(response);
  } catch (err) {
    throw err;
  }
};

export const getSelectedAgents = async (idList) => {
  const size = idList.length;
  try {
    const response = await agentService.searchAgent(
      PAGE,
      size,
      null,
      undefined,
      FIELDS,
      null,
      idList,
    );
    formatOptions(response);
  } catch (err) {
    throw err;
  }
};
