import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTags } from '../../api/tags';
import { Tags } from './types';

export const getTags = createAsyncThunk(
  'tags/all',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { tags },
      } = await getAllTags();

      return tags as Tags;
    } catch (err) {
      rejectWithValue(err as Error);
    }
  }
);