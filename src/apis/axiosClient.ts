import axios, { AxiosResponse } from "axios";
import Config from "react-native-config";

const axiosClient = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 1500,
  headers: { "Content-Type": "application/json" },
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => Promise.reject(error)
);

export default axiosClient;
