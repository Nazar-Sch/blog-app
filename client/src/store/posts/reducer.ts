import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getPosts,
  updateLikes,
  getPostsBySearch,
  getPostsByTag,
} from './services';
import { Likes, Post, PostsState } from './types';

export const initialState: PostsState = {
  posts: [],
  error: '',
  isLoading: true,
  currentPage: 0,
  amountOfPages: 0,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.fulfilled.type]: (
      state,
      action: PayloadAction<{
        posts: Post[];
        currentPage: number;
        amountOfPages: number;
      }>
    ) => {
      console.log(action.payload);
      state.isLoading = false;
      state.error = '';
      state.posts = action.payload.posts;
      state.currentPage = action.payload.currentPage;
      state.amountOfPages = action.payload.amountOfPages;
    },
    [getPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.posts = [];
      state.currentPage = 0;
      state.amountOfPages = 0;
    },
    [getPostsBySearch.fulfilled.type]: (
      state,
      action: PayloadAction<{
        posts: Post[];
        amountOfPages: number;
      }>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.posts = action.payload.posts;
      state.amountOfPages = action.payload.amountOfPages;
    },
    [getPostsBySearch.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
      state.posts = [];
    },
    [getPostsByTag.fulfilled.type]: (
      state,
      action: PayloadAction<{
        posts: Post[];
        amountOfPages: number;
      }>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.posts = action.payload.posts;
      state.amountOfPages = action.payload.amountOfPages;
    },
    [getPostsByTag.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
      state.posts = [];
    },
    [updateLikes.fulfilled.type]: (
      state,
      action: PayloadAction<{ id: string; likes: Likes[] }>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.posts = state.posts.map(post =>
        post._id === action.payload.id
          ? { ...post, likes: action.payload.likes }
          : post
      );
    },
    [updateLikes.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postsSlice.reducer;
