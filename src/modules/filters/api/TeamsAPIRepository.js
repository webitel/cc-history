import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import { SdkListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../app/api/instance';
import configuration from '../../../app/api/utils/openAPIConfig';

const teamService = new AgentTeamServiceApiFactory(configuration, '', instance);

const listGetter = new SdkListGetterApiConsumer(teamService.searchAgentTeam);

const getTeamsLookup = (params) => listGetter.getLookup(params);

const TeamsAPIRepository = {
  getLookup: getTeamsLookup,
};

export default TeamsAPIRepository;