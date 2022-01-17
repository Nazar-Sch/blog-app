import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getSelectedPost,
  createNewPost,
  editPost,
  deletePost,
  addComment,
  deleteComment,
  likeComment,
} from './services';
import { CreatedPost, Likes, Post, PostState } from '../posts/types';
import { updateLikes } from '../posts/services';

export const initialState: PostState = {
  post: null,
  error: '',
  isLoading: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [getSelectedPost.fulfilled.type]: (
      state,
      action: PayloadAction<Post>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.post = action.payload;
    },
    [getSelectedPost.pending.type]: (state, _) => {
      state.isLoading = true;
      state.error = '';
    },
    [getSelectedPost.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
      state.post = null;
    },

    [createNewPost.fulfilled.type]: (
      state,
      action: PayloadAction<Post>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.post = action.payload;
    },
    [createNewPost.pending.type]: (state, _) => {
      state.isLoading = true;
      state.error = '';
    },
    [createNewPost.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
      state.post = null;
    },

    [editPost.fulfilled.type]: (
      state,
      action: PayloadAction<CreatedPost>
    ) => {
      const updated = {
        title: action.payload.title,
        content: action.payload.content,
        date: Date.now().toString(),
        likes: state.post?.likes || [],
        author: action.payload.author,
        _id: action.payload.id,
        comments: state.post?.comments || [],
        tags: state.post?.tags || [],
      };

      state.isLoading = false;
      state.error = '';
      state.post = updated;
    },
    [editPost.pending.type]: (state, _) => {
      state.isLoading = true;
      state.error = '';
    },
    [editPost.rejected.type]: (state, action: PayloadAction<string>) => {
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

    [addComment.fulfilled.type]: (state, action: PayloadAction<Post>) => {
      state.isLoading = false;
      state.error = '';
      state.post = action.payload;
    },
    [addComment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteComment.fulfilled.type]: (
      state,
      action: PayloadAction<Post>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.post = action.payload;
    },
    [deleteComment.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [likeComment.fulfilled.type]: (state, action: PayloadAction<Post>) => {
      state.isLoading = false;
      state.error = '';
      state.post = action.payload;
    },
    [likeComment.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateLikes.fulfilled.type]: (state, action: PayloadAction<{ id: string; likes: Likes[] }>) => {
      console.log(action.payload);
      state.isLoading = false;
      state.error = '';
      if (state.post) {
        state.post.likes = action.payload.likes;
      }
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

export default postSlice.reducer;
