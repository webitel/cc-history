import { getOptionsFromAPI, getSelectedOptionsFromAPI } from './defaults/APIdefaults';

const BASE_URL = '/sip/gateways';

export const fetchGateways = async (search = '') => getOptionsFromAPI({
  BASE_URL,
  search,
});

export const getSelectedGateways = async (idList) => getSelectedOptionsFromAPI({
  BASE_URL,
  idList,
});
