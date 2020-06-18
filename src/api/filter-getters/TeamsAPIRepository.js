import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../utils/openAPIConfig';
import { formatOptions, defaultParams } from './defaults/defaults';

const teamService = new AgentTeamServiceApiFactory(configuration, '', instance);

export const fetchTeams = async ({
                                    page,
                                    size,
                                    search,
                                    fields,
                                    id,
                                  }) => {
  try {
    const response = await teamService.searchAgentTeam(
      page,
      size,
      `${search}*`,
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

const TeamsAPIRepository = {
  getTeams(argParams) {
    const params = {
      ...defaultParams,
      ...argParams,
    };
    return fetchTeams(params);
  },
  getTeamsByIds(idList) {
    const params = {
      ...defaultParams,
      size: idList.length,
      id: idList,
    };
    return fetchTeams(params);
  },
};

export default TeamsAPIRepository;
