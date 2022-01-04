import { API } from '.';
import { CreatedPost } from '../types/initialTypes';

export type SearcQuery = {
  search: string;
  tags: string;
}

export const getAllPosts = () => API.get('/posts');

export const getAllPostsByTags = (ids: string) => API.get(`/posts/topics?tags=${ids}`);

export const getPostById = (id: string) => API.get(`/posts/${id}`);

export const getPostBySearchQuery = ({ search, tags }: SearcQuery) => API.get(`/posts/search?query=${search || 'none'}&tags=${tags}`);

export const addNewPost = (post: CreatedPost) =>
  API.post('/posts/new', post);

export const deletePostByID = (id: string) =>
  API.delete(`/posts/delete/${id}`);

export const editPostById = (id: string, post: CreatedPost) =>
  API.put(`/posts/edit/${id}`, post);

export const addLikePostById = (id: string) =>
  API.patch(`/posts/likes/${id}`);

