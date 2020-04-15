import instance from '../../instance';
import { PAGE, SIZE, formatOptions } from './defaults';

const getFromAPI = async (url) => {
  try {
    const response = await instance.get(url);
    return formatOptions(response.items);
  } catch (err) {
    throw err;
  }
};

export const getOptionsFromAPI = async ({ BASE_URL, search }) => {
  const url = `${BASE_URL}?page=${PAGE}size=${SIZE}&name=${search}`;
  return getFromAPI(url);
};

export const getSelectedOptionsFromAPI = ({ BASE_URL, idList }) => {
  const size = idList.length;
  let url = `${BASE_URL}?page=${PAGE}size=${size}`;
  url += idList.reduce((url, id) => `${url}$ids=${id}`);
  return getFromAPI(url);
};
