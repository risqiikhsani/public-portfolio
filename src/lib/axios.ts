// src/lib/axios.ts

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

// Create a base Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authentication headers here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Custom hook for using Axios
export const useAxios = (url: string, method: string = 'get', options: AxiosRequestConfig = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axiosInstance({
          method,
          url,
          ...options,
        });
        setData(response.data);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, options]);

  return { data, error, loading };
};

// Helper functions for common HTTP methods
export const get = (url: string, config?: AxiosRequestConfig) => axiosInstance.get(url, config);
export const post = (url: string, data?: unknown, config?: AxiosRequestConfig) => axiosInstance.post(url, data, config);
export const put = (url: string, data?: unknown, config?: AxiosRequestConfig) => axiosInstance.put(url, data, config);
export const del = (url: string, config?: AxiosRequestConfig) => axiosInstance.delete(url, config);

export default axiosInstance;