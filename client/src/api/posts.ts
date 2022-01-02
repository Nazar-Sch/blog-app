import axios from "axios";
import { CreatedPost } from "../types/initialTypes";

const API_LINK = '/api/posts';

export const getAllPosts = () => axios.get(API_LINK);

export const getSelectedPost = (id: string) => axios.get(`${API_LINK}/${id}`);

export const addNewPost = (post: CreatedPost) => axios.post(`${API_LINK}/new`, post);

export const deletePostByID = (id: string) => axios.delete(`${API_LINK}/delete/${id}`);

export const editPost = (id: string, post: CreatedPost ) => axios.put(`${API_LINK}/edit/${id}`, post);
