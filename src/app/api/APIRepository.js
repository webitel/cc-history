import CallAnnotationAPIRepository from '../../modules/main/modules/registry/modules/opened-call/api/CallAnnotationAPIRepository';
import RegistryAPIRepository from '../../modules/main/modules/registry/api/RegistryAPIRepository';
import DashboardAPIRepository from '../../modules/main/modules/dashboards/api/DashboardAPIRepository';

const APIRepository = {
  history: RegistryAPIRepository,
  dashboards: DashboardAPIRepository,
  annotations: CallAnnotationAPIRepository,
};

export default APIRepository;
