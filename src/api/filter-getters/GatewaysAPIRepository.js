import getOptionsFromAPI from './defaults/APIdefaults';
import { defaultParams } from './defaults/defaults';

const BASE_URL = '/sip/gateways';

export const fetchGateways = async (params) => getOptionsFromAPI(BASE_URL, params);

const GatewaysAPIRepository = {
  getGateways(argParams) {
    const params = {
      ...defaultParams,
      ...argParams,
    };
    return fetchGateways(params);
  },
  getGatewaysByIds(idList) {
    const params = {
      ...defaultParams,
      size: idList.length,
      id: idList,
    };
    return fetchGateways(params);
  },
};

export default GatewaysAPIRepository;
