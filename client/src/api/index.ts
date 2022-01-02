import axios from "axios";

const API_LINK = '/api';

export const API = axios.create({
  baseURL: API_LINK,
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(req => {
  const token = JSON.parse(localStorage.getItem('token') as string);
  if (token) {
    // @ts-ignore
    req.headers['x-access-token'] = token;
  }

  return req;
});