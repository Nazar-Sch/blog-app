import { CallToActionSharp } from '@mui/icons-material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import {
  getSelectedPost,
  createNewPost,
  getPosts,
  updateLikes,
  editPost,
  deletePost,
  getPostsBySearch,
  getPostsByTag,
} from './services';
import { CreatedPost, Post, PostsState } from './types';

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
    [getPostsBySearch.fulfilled.type]: (state, action: PayloadAction<Post[]>) => {
      state.isLoading = false;
      state.error = '';
      state.posts = action.payload;
    },
    [getPostsBySearch.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.posts = [];
    },
    [getPostsByTag.fulfilled.type]: (state, action: PayloadAction<Post[]>) => {
      state.isLoading = false;
      state.error = '';
      state.posts = action.payload;
    },
    [getPostsByTag.rejected.type]: (state, action: PayloadAction<string>) => {
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
    [editPost.fulfilled.type]: (
      state,
      action: PayloadAction<CreatedPost>
    ) => {
      const updated = {
        title: action.payload.title,
        content: action.payload.content,
        date: Date.now().toString(),
        likes: state.selectedPost?.likes || [],
        author: action.payload.author,
        _id: action.payload.id,
        comments: state.selectedPost?.comments || [],
        tags: state.selectedPost?.tags || [],
      };

      state.isLoading = false;
      state.error = '';
      state.selectedPost = updated;
    },
    [editPost.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
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
    [deletePost.fulfilled.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = '';
    },
    [deletePost.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postsSlice.reducer;
