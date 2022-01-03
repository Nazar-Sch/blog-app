import { API } from '.';
import { EditPost } from '../store/posts/types';
import { CreatedPost } from '../types/initialTypes';

export const getAllPosts = () => API.get('/posts');

export const getPostById = (id: string) => API.get(`/posts/${id}`);

export const addNewPost = (post: CreatedPost) =>
  API.post('/posts/new', post);

export const deletePostByID = (id: string) =>
  API.delete(`/posts/delete/${id}`);

export const editPostById = (id: string, post: CreatedPost) =>
  API.put(`/posts/edit/${id}`, post);

export const addLikePostById = (id: string) =>
  API.patch(`/posts/likes/${id}`);

