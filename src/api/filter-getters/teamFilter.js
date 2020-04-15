import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import { formatOptions, PAGE, SIZE } from './defaults/defaults';

const teamService = new AgentTeamServiceApiFactory(configuration, '', instance);

const fetchTeams = async (search = '') => {
  try {
    const response = await teamService.searchAgentTeam(PAGE, SIZE, search);
    return formatOptions(response.items);
  } catch (err) {
    throw err;
  }
};

export default {
  fetchTeams,
};
