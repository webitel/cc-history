import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import {
  formatOptions,
  PAGE,
  SIZE,
  FIELDS,
} from './defaults/defaults';

const teamService = new AgentTeamServiceApiFactory(configuration, '', instance);

export const fetchTeams = async (search = '') => {
  try {
    const response = await teamService.searchAgentTeam(
      PAGE,
      SIZE,
      search,
      undefined,
      FIELDS,
    );
    return formatOptions(response);
  } catch (err) {
    throw err;
  }
};
export const getSelectedTeams = async (idList) => {
  const size = idList.length;
  try {
    const response = await teamService.searchAgentTeam(
      PAGE,
      size,
      null,
      undefined,
      FIELDS,
      null,
      idList,
    );
    return formatOptions(response);
  } catch (err) {
    throw err;
  }
};
