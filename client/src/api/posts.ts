import { API } from '.';
import { CreatedPost } from '../types/initialTypes';

export const getAllPosts = () => API.get('/posts');

export const getPostById = (id: string) => API.get(`/posts/${id}`);

export const addNewPost = (post: CreatedPost) =>
  API.post('/posts/new', post);
