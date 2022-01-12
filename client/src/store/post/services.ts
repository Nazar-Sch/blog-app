import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addNewPost,
  createComment,
  deleteCommentById,
  deletePostByID,
  editCommentById,
  editPostById,
  getPostById,
  updateCommentLike,
} from '../../api/posts';
import { CreatedPost } from '../../types/initialTypes';
import { CommentIds, EditComment, NewComment, Post } from '../posts/types';


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
  async (
    { createdPost, cb }: { createdPost: CreatedPost; cb: VoidFunction },
    { rejectWithValue }
  ) => {
    try {
      const {
        data: { post },
      } = await addNewPost(createdPost);
      cb();
      return post;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const editPost = createAsyncThunk(
  'posts/edit',
  async (
    { id, post }: { id: string; post: CreatedPost },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await editPostById(id, post);
      const updatedPost = { ...data.post, id };
      console.log('returned post to edit', updatedPost);

      return updatedPost;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (
    { id, cb }: { id: string; cb: VoidFunction },
    { rejectWithValue }
  ) => {
    try {
      const {
        data: { message },
      } = await deletePostByID(id);
      cb();
      return message;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const addComment = createAsyncThunk(
  'posts/comments/add',
  async (
    values: NewComment,
    { rejectWithValue }
  ) => {
    try {
      const {
        data: { post },
      } = await createComment(values);

      return post as Post;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'posts/comments/deletew',
  async (
    ids: CommentIds,
    { rejectWithValue }
  ) => {
    try {
      const {
        data: { post },
      } = await deleteCommentById(ids);

      return post as Post;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const likeComment = createAsyncThunk(
  'posts/comments/like',
  async (
    ids: CommentIds,
    { rejectWithValue }
  ) => {
    try {
      const {
        data: { post },
      } = await updateCommentLike(ids);

      return post as Post;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const editComment = createAsyncThunk(
  'posts/comments/like',
  async (
    value: EditComment,
    { rejectWithValue }
  ) => {
    try {
      const {
        data: { post },
      } = await editCommentById(value);
  
      return post as Post;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);
