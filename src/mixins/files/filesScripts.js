import jszipUtils from 'jszip-utils';

const token = localStorage.getItem('access-token');
const BASE_URL = process.env.VUE_APP_API_URL;

export const generateURL = (id) => (
  `${BASE_URL}/storage/recordings/${id}/stream?access_token=${token}`
);

export const fetchFileBinary = (id) => {
  const url = generateURL(id);
  return new Promise((resolve, reject) => (
    jszipUtils.getBinaryContent(url, (err, data) => {
      if (err) {
        reject();
      } else {
        resolve(data);
      }
    })));
};
