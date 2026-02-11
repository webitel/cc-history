import DashboardAPIRepository from '../../modules/main/modules/dashboards/api/DashboardAPIRepository';
import RegistryAPIRepository from '../../modules/main/modules/registry/api/RegistryAPIRepository';
import CallAnnotationAPIRepository from '../../modules/main/modules/registry/modules/call/api/CallAnnotationAPIRepository';

const APIRepository = {
	history: RegistryAPIRepository,
	dashboards: DashboardAPIRepository,
	annotations: CallAnnotationAPIRepository,
};

export default APIRepository;
