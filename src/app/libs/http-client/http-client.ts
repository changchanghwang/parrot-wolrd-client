import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_ENDPOINT } from "@configs";

export const httpClient = (() => {
  const axios = Axios.create({ baseURL: API_ENDPOINT, withCredentials: true });
  axios.interceptors.request.use((config) => {
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    config.headers.Accept = "*/*";
    return config;
  });

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.data?.errorMessage) {
        err.message = err?.response?.data?.errorMessage || err.message;
      }
      return Promise.reject(err);
    }
  );

  return {
    async get<T>(
      url: string,
      config?: {
        params?: Record<string, any>;
        paramsSerializer?: (param: Record<string, any>) => any;
      }
    ): Promise<T> {
      const res = await axios.get(url, config);
      return res?.data;
    },
    async post<T>(url: string, data: Record<string, any>): Promise<T> {
      const res = await axios.post(url, data);
      return res?.data;
    },
    async patch<T>(url: string, data: Record<string, any>): Promise<T> {
      const res = await axios.patch(url, data);
      return res?.data;
    },
    async delete<T>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
      return axios.delete(url, config);
    },
  };
})();
