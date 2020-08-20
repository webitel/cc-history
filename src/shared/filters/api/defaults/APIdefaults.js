import instance from '../../../../api/instance';
import { formatOptions } from './defaults';

const getFromAPI = async (url) => {
  try {
    const response = await instance.get(url);
    return formatOptions(response);
  } catch (err) {
    throw err;
  }
};

const getOptionsFromAPI = async (BASE_URL, {
  page,
  size,
  search,
  fields,
  id,
}) => {
  let url = `${BASE_URL}?page=${page}&size=${size}&fields=${fields.join(',')}`;
  if (search) url += `&name=${search}*`;
  if (id) url += `&ids=${id.reduce((url, id) => `${url}&ids=${id}`)}`;
  return getFromAPI(url);
};

export default getOptionsFromAPI;
