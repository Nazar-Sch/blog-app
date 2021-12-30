import axios from 'axios';

import { CreatedPost } from '../types/initialTypes';

const API_LINK = '/api';
const API = axios.create({ baseURL: API_LINK });

API.interceptors.request.use(req => {
  const token = JSON.parse(localStorage.getItem('token') as string);
  if (token) {
    // @ts-ignore
    req.headers['x-access-token'] = token;
  }

  return req;
});

export const getAllPosts = () => API.get('/posts');

export const getSelectedPost = (id: string) => API.get(`/posts/${id}`);

export const addNewPost = (post: CreatedPost) =>
  API.post('/posts/new', post);
