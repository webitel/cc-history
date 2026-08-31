import { CallAnnotationsAPI } from '@webitel/api-services/api';

import DashboardAPIRepository from '../../modules/main/modules/dashboards/api/DashboardAPIRepository';
import RegistryAPIRepository from '../../modules/main/modules/registry/api/RegistryAPIRepository';

const APIRepository = {
	history: RegistryAPIRepository,
	dashboards: DashboardAPIRepository,
	annotations: CallAnnotationsAPI,
};

export default APIRepository;
