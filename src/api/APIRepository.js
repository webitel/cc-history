import HistoryAPIRepository from './history/HistoryAPIRepository';
import AuthAPIRepository from './auth/AuthAPIRepository';
import AgentsAPIRepository from '../shared/filters/api/AgentsAPIRepository';
import GatewaysAPIRepository from '../shared/filters/api/GatewaysAPIRepository';
import QueuesAPIRepository from '../shared/filters/api/QueuesAPIRepository';
import TeamsAPIRepository from '../shared/filters/api/TeamsAPIRepository';
import UsersAPIRepository from '../shared/filters/api/UsersAPIRepository';
import DashboardAPIRepository from './history/dashboards/DashboardAPIRepository';

const APIRepository = {
  history: HistoryAPIRepository,
  dashboards: DashboardAPIRepository,
  agents: AgentsAPIRepository,
  gateways: GatewaysAPIRepository,
  queues: QueuesAPIRepository,
  teams: TeamsAPIRepository,
  users: UsersAPIRepository,
  auth: AuthAPIRepository,
};

export default APIRepository;
