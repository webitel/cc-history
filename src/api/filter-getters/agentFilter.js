import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import getDomainId from '../utils/getDomainId';
import {
  formatOptions,
  PAGE,
  SIZE,
  FIELDS,
} from './defaults/defaults';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

export const fetchAgents = async (search = '') => {
  const domainId = getDomainId();
  try {
    const response = await agentService.searchAgent(
      PAGE,
      SIZE,
      search,
      domainId,
      FIELDS,
    );
    return formatOptions(response);
  } catch (err) {
    throw err;
  }
};

export const getSelectedAgents = async (idList) => {
  const domainId = getDomainId();
  const size = idList.length;
  try {
    const response = await agentService.searchAgent(
      PAGE,
      size,
      null,
      domainId,
      FIELDS,
      null,
      idList,
    );
    return formatOptions(response);
  } catch (err) {
    throw err;
  }
};
