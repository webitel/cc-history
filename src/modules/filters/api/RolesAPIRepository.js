import { EndpointListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../app/api/old/instance';

const baseUrl = '/roles';

const listGetter = new EndpointListGetterApiConsumer({ instance, baseUrl });

const getRolesLookup = (params) => listGetter.getLookup(params);

const RolesAPIRepository = {
  getLookup: getRolesLookup,
};

export default RolesAPIRepository;
