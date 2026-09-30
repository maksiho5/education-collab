import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export const loginApi = (data: { email: string; password: string }) =>
  API.post('/auth/login', data);

export const registerApi = (data: { name: string; email: string; password: string }) =>
  API.post('/auth/register', data);

export const refreshApi = () => API.post('/auth/refresh', {}, {});

export const getAccountApi = (accessToken: string) =>
  API.post('/auth/getAccount', { accessToken: accessToken }, {});
