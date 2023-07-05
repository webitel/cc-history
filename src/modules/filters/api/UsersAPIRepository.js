import { EndpointListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../app/api/old/instance';

const baseUrl = '/users';

const listGetter = new EndpointListGetterApiConsumer({ instance, baseUrl });

const getUsersLookup = (params) => listGetter.getLookup(params);

const UsersAPIRepository = {
  getLookup: getUsersLookup,
};

export default UsersAPIRepository;
