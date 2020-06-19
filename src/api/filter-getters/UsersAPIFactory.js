import getOptionsFromAPI from './defaults/APIdefaults';
import { defaultParams } from './defaults/defaults';

const BASE_URL = '/users';

export const fetchUsers = async (params) => getOptionsFromAPI(BASE_URL, params);

const UsersAPIRepository = {
  getUsers(argParams) {
    const params = {
      ...defaultParams,
      ...argParams,
    };
    return fetchUsers(params);
  },
  getUsersByIds(idList) {
    const params = {
      ...defaultParams,
      size: idList.length,
      id: idList,
    };
    return fetchUsers(params);
  },
};

export default UsersAPIRepository;
