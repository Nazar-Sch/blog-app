import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getSelectedPost,
  createNewPost,
  getPosts,
  updateLikes,
} from './services';
import { Post, PostsState } from './types';

export const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  error: '',
  isLoading: true,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.fulfilled.type]: (state, action: PayloadAction<Post[]>) => {
      state.isLoading = false;
      state.error = '';
      state.posts = action.payload;
    },
    [getPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.posts = [];
    },
    [getSelectedPost.fulfilled.type]: (
      state,
      action: PayloadAction<Post>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.selectedPost = action.payload;
    },
    [getSelectedPost.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
      state.selectedPost = null;
    },
    [createNewPost.fulfilled.type]: (
      state,
      action: PayloadAction<Post>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.selectedPost = action.payload;
    },
    [createNewPost.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
      state.selectedPost = null;
    },
    [updateLikes.fulfilled.type]: (
      state,
      action: PayloadAction<{ id: string; likes: any[] }>
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
