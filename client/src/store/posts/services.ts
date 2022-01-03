import { createAsyncThunk } from '@reduxjs/toolkit';
import { addLikePostById, addNewPost, getAllPosts, getPostById } from '../../api/posts';
import { CreatedPost } from '../../types/initialTypes';

export const getPosts = createAsyncThunk(
  'posts/all',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { posts },
      } = await getAllPosts();

      return posts;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const getSelectedPost = createAsyncThunk(
  'posts/selected',
  async (id: string, { rejectWithValue }) => {
    try {
      const {
        data: { post },
      } = await getPostById(id);

      return post;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const createNewPost = createAsyncThunk(
  'posts/new',
  async (createdPost: CreatedPost, { rejectWithValue }) => {
    try {
      const {
        data: { post },
      } = await addNewPost(createdPost);

      return post;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const updateLikes = createAsyncThunk(
  'posts/updateLike',
  async (id: string, { rejectWithValue }) => {
    try {
      const {
        data,
      } = await addLikePostById(id);

      return {id: data.id, likes: data.likes };
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);