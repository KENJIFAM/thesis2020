import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
});

export const setTokenHeader = (token?: string) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;
