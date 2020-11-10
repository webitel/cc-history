import RegistryAPIRepository from './history/registry/RegistryAPIRepository';
import AuthAPIRepository from './auth/AuthAPIRepository';
import AgentsAPIRepository from '../shared/filters/filter-agent/AgentsAPIRepository';
import GatewaysAPIRepository from '../shared/filters/filter-gateway/GatewaysAPIRepository';
import QueuesAPIRepository from '../shared/filters/filter-queues/QueuesAPIRepository';
import TeamsAPIRepository from '../shared/filters/filter-teams/TeamsAPIRepository';
import UsersAPIRepository from '../shared/filters/filter-user/UsersAPIRepository';
import DashboardAPIRepository from './history/dashboards/DashboardAPIRepository';

const APIRepository = {
  history: RegistryAPIRepository,
  dashboards: DashboardAPIRepository,
  agents: AgentsAPIRepository,
  gateways: GatewaysAPIRepository,
  queues: QueuesAPIRepository,
  teams: TeamsAPIRepository,
  users: UsersAPIRepository,
  auth: AuthAPIRepository,
};

export default APIRepository;
