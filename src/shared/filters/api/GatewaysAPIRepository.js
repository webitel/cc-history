import { EndpointListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../api/instance';

const baseUrl = '/sip/gateways';

const listGetter = new EndpointListGetterApiConsumer({ instance, baseUrl });

const getGatewaysLookup = (params) => listGetter.getLookup(params);

const GatewaysAPIRepository = {
  getLookup: getGatewaysLookup,
};

export default GatewaysAPIRepository;
