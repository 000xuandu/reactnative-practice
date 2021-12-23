import axios, {AxiosResponse} from 'axios';
import Config from 'react-native-config';

export const axiosClient = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 1500,
  headers: {'Content-Type': 'application/json'},
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);
