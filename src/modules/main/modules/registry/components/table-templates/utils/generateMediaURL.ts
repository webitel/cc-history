const token = localStorage.getItem('access-token');
const BASE_URL = import.meta.env.VITE_API_URL;

const generateMediaURL = (id: string): string =>
  `${BASE_URL}/storage/recordings/${id}/stream?access_token=${token}`;

export default generateMediaURL;
