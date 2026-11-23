import DashboardAPIRepository from '../../modules/main/modules/dashboards/api/DashboardAPIRepository';
import RegistryAPIRepository from '../../modules/main/modules/registry/api/RegistryAPIRepository';

const APIRepository = {
	history: RegistryAPIRepository,
	dashboards: DashboardAPIRepository,
};

export default APIRepository;
