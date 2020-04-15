import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import { formatOptions, PAGE, SIZE } from './defaults/defaults';

const teamService = new AgentTeamServiceApiFactory(configuration, '', instance);

// eslint-disable-next-line import/prefer-default-export
export const fetchTeams = async (search = '') => {
  try {
    const response = await teamService.searchAgentTeam(PAGE, SIZE, search);
    return formatOptions(response);
  } catch (err) {
    throw err;
  }
};
