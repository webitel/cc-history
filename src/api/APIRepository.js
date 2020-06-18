import HistoryAPIRepository from './history/HistoryAPIRepository';
import AuthAPIRepository from './auth/AuthAPIRepository';
import AgentsAPIRepository from './filter-getters/AgentsAPIRepository';
import GatewaysAPIRepository from './filter-getters/GatewaysAPIRepository';
import QueuesAPIRepository from './filter-getters/QueuesAPIRepository';
import TeamsAPIRepository from './filter-getters/TeamsAPIRepository';
import UsersAPIRepository from './filter-getters/UsersAPIFactory';

const APIRepository = {
  history: HistoryAPIRepository,
  agents: AgentsAPIRepository,
  gateways: GatewaysAPIRepository,
  queues: QueuesAPIRepository,
  teams: TeamsAPIRepository,
  users: UsersAPIRepository,
  auth: AuthAPIRepository,
};

export default APIRepository;
