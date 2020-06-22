const token = localStorage.getItem('access-token');
const BASE_URL = process.env.VUE_APP_API_URL;

const generateMediaURL = (id) => (
  `${BASE_URL}/storage/recordings/${id}/stream?access_token=${token}`
);

export default generateMediaURL;
