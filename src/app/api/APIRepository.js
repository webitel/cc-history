import CallAnnotationAPIRepository from '../../modules/main/modules/registry/modules/call/api/CallAnnotationAPIRepository';
import AuditAPIRepository from '../../modules/main/modules/registry/api/AuditAPIRepository';
import RegistryAPIRepository from '../../modules/main/modules/registry/api/RegistryAPIRepository';
import DashboardAPIRepository from '../../modules/main/modules/dashboards/api/DashboardAPIRepository';

const APIRepository = {
  audit: AuditAPIRepository,
  history: RegistryAPIRepository,
  dashboards: DashboardAPIRepository,
  annotations: CallAnnotationAPIRepository,
};

export default APIRepository;
