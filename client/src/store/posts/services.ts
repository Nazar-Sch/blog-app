import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addLikePostById,
  getAllPosts,
  getAllPostsByTags,
  getPostBySearchQuery,
  SearcQuery,
} from '../../api/posts';

export const getPosts = createAsyncThunk(
  'posts/all',
  async (page: string | number, { rejectWithValue }) => {
    try {
      const {
        data: { posts, currentPage, amountOfPages },
      } = await getAllPosts(page.toString());

      return { posts, currentPage, amountOfPages };
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const getPostsBySearch = createAsyncThunk(
  'posts/search',
  async (searchQuery: SearcQuery, { rejectWithValue }) => {
    try {
      const {
        data: { posts, amountOfPages },
      } = await getPostBySearchQuery(searchQuery);

      return { posts, amountOfPages };
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const getPostsByTag = createAsyncThunk(
  'posts/searchTag',
  async (tags: string, { rejectWithValue }) => {
    try {
      const {
        data: { posts, amountOfPages },
      } = await getAllPostsByTags(tags);

      return { posts, amountOfPages };
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const updateLikes = createAsyncThunk(
  'posts/updateLike',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await addLikePostById(id);

      return { id: data.id, likes: data.likes };
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);
