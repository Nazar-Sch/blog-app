import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addLikePostById,
  addNewPost,
  createComment,
  deletePostByID,
  editPostById,
  getAllPosts,
  getAllPostsByTags,
  getPostById,
  getPostBySearchQuery,
  SearcQuery,
} from '../../api/posts';
import { CreatedPost } from '../../types/initialTypes';
import { NewComment } from './types';

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

export const getPostsBySearch = createAsyncThunk(
  'posts/search',
  async (searchQuery: SearcQuery, { rejectWithValue }) => {
    try {
      const {
        data: { posts },
      } = await getPostBySearchQuery(searchQuery);

      return posts;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);

export const getPostsByTag = createAsyncThunk(
  'posts/searchTag',
  async (tag: string, { rejectWithValue }) => {
    try {
      const {
        data: { posts },
      } = await getAllPostsByTags(tag);

      return posts;
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
    values:  NewComment,
    { rejectWithValue }
  ) => {
    try {
      const {
        data: { comments },
      } = await createComment(values);
      console.log(comments);
      return comments;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);
