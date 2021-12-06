import axios from "axios";
import { CreatedPost } from "../types/initialTypes";

const API_LINK = 'api/posts';

export const getAllPosts = () => axios.get(API_LINK);

export const getSelectedPost = (id: string) => axios.get(`${API_LINK}/${id}`);

export const addNewPost = (post: CreatedPost) => axios.post(`${API_LINK}/new`, post);


