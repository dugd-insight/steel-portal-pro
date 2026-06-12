/**
 * API 客户端配置
 * 使用 Axios 创建统一的 API 请求实例
 */
import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// 创建 Axios 实例
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 可在此处添加认证 token
apiClient.interceptors.request.use(
  (config) => {
    // 如需添加认证 token，可在此处理
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 统一错误处理
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // API 返回格式: { success: true, data: {...} }
    if (response.data && response.data.success) {
      return response.data.data;
    }
    return response.data;
  },
  (error: AxiosError) => {
    // 统一错误处理
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response;
      console.error(`API Error ${status}:`, data);

      // 可根据不同状态码做不同处理
      switch (status) {
        case 401:
          // 未授权，可跳转登录页
          console.error('Unauthorized access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('Request failed');
      }
    } else if (error.request) {
      // 请求发出但没有收到响应
      console.error('No response received:', error.request);
    } else {
      // 请求配置出错
      console.error('Request error:', error.message);
    }

    return Promise.reject(error);
  }
);

// 封装常用 HTTP 方法
export const get = <T>(url: string, params?: object): Promise<T> => {
  return apiClient.get(url, { params }) as Promise<T>;
};

export const post = <T>(url: string, data?: object): Promise<T> => {
  return apiClient.post(url, data) as Promise<T>;
};

export const put = <T>(url: string, data?: object): Promise<T> => {
  return apiClient.put(url, data) as Promise<T>;
};

export const del = <T>(url: string): Promise<T> => {
  return apiClient.delete(url) as Promise<T>;
};

export default apiClient;
