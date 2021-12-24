import axios, { AxiosResponse } from "axios";

axios.interceptors.request.use((config) => {
  return config;
});

axios.interceptors.response.use((res: AxiosResponse) => {
  return res;
});

export default axios;
