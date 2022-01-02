import { API } from '.';
import { CreatedPost } from '../types/initialTypes';

export const getAllPosts = () => API.get('/posts');

export const getPostById = (id: string) => API.get(`/posts/${id}`);

export const addNewPost = (post: CreatedPost) =>
  API.post('/posts/new', post);
const API_LINK = '/api/posts';

export const deletePostByID = (id: string) => API.delete(`${API_LINK}/delete/${id}`);

export const editPost = (id: string, post: CreatedPost ) => API.put(`${API_LINK}/edit/${id}`, post);
