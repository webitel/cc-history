import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import {
  formatOptions,
  PAGE,
  SIZE,
  FIELDS,
} from './defaults/defaults';
import getDomainId from '../utils/getDomainId';

const teamService = new AgentTeamServiceApiFactory(configuration, '', instance);

export const fetchTeams = async (search = '') => {
  const domainId = getDomainId();
  try {
    const response = await teamService.searchAgentTeam(
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
export const getSelectedTeams = async (idList) => {
  const domainId = getDomainId();
  const size = idList.length;
  try {
    const response = await teamService.searchAgentTeam(
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
