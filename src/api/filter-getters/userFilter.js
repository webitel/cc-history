import { getOptionsFromAPI, getSelectedOptionsFromAPI } from './defaults/APIdefaults';

const BASE_URL = '/users';

export const fetchUsers = async (search = '') => getOptionsFromAPI({
  BASE_URL,
  search,
});

export const getSelectedUsers = async (idList) => getSelectedOptionsFromAPI({
  BASE_URL,
  idList,
});
