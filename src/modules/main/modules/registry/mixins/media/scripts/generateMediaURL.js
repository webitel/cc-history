const generateMediaURL = (id, download) => {
  const token = localStorage.getItem('access-token');
  const BASE_URL = process.env.VUE_APP_API_URL;
  return `${BASE_URL}/storage/recordings/${id}/${download ? 'download' : 'stream'}?access_token=${token}`;
};

export default generateMediaURL;
