import { API } from '.';
import { CommentIds, EditComment, NewComment } from '../store/posts/types';
import { CreatedPost } from '../types/initialTypes';

export type SearcQuery = {
  search: string;
  tags?: string;
}

export const getAllPosts = () => API.get('/posts');

export const getAllPostsByTags = (ids: string) => API.get(`/posts/topics?tags=${ids}`);

export const getPostById = (id: string) => API.get(`/posts/${id}`);

// export const getPostBySearchQuery = ({ search, tags }: SearcQuery) => API.get(`/posts/search?query=${search || 'none'}&tags=${tags}`);
export const getPostBySearchQuery = ({ search, tags }: SearcQuery) => API.get(`/posts/search?query=${search}`);

export const addNewPost = (post: CreatedPost) =>
  API.post('/posts/new', post);

export const deletePostByID = (id: string) =>
  API.delete(`/posts/delete/${id}`);

export const editPostById = (id: string, post: CreatedPost) =>
  API.put(`/posts/edit/${id}`, post);

export const addLikePostById = (id: string) =>
  API.patch(`/posts/likes/${id}`);

export const createComment = ({ id, text, author }: NewComment) =>
  API.post(`/posts/comments/${id}`, { text, author });

export const deleteCommentById = ({ postId, commentId }: CommentIds) =>
  API.delete(`/posts/comments/${postId}/${commentId}`);

export const updateCommentLike = ({ postId, commentId }: CommentIds) =>
  API.patch(`/posts/comments/likes/${postId}/${commentId}`);

export const editCommentById = ({ postId, commentId, text }: EditComment) =>
  API.patch(`/posts/comments/edit/${postId}/${commentId}`, { text });
