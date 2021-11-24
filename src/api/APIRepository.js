import CallAnnotationAPIRepository from './history/registry/CallAnnotationAPIRepository';
import RegistryAPIRepository from './history/registry/RegistryAPIRepository';
import DashboardAPIRepository from './history/dashboards/DashboardAPIRepository';

const APIRepository = {
  history: RegistryAPIRepository,
  dashboards: DashboardAPIRepository,
  annotations: CallAnnotationAPIRepository,
};

export default APIRepository;
