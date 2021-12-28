import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

export interface CustomInstance {
  get<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<IResponse<T>>;

  delete<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<IResponse<T>>;

  head<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<IResponse<T>>;

  options<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<IResponse<T>>;

  post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<IResponse<T>>;

  put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<IResponse<T>>;
}

interface IResponse<T = any> {
  code: number;
  data: T;
  message?: string;
}

const instance = axios.create();
instance.interceptors.request.use((config) => {
  config.baseURL = "/api";
  return config;
});
instance.interceptors.response.use((res: AxiosResponse<IResponse>) => {
  if (res.data.code !== 200) {
    ElMessage.error(res.data.message);
  }
  return res.data;
});

export default instance as CustomInstance;
