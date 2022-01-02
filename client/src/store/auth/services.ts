import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserByIdCall,
  signInApiCall,
  SignInProps,
  signUpApiCall,
  SignUpProps,
} from '../../api/user';

export const signin = createAsyncThunk(
  'auth/signin',
  async (payload: SignInProps, { rejectWithValue }) => {
    try {
      const {
        data: { token, user },
      } = await signInApiCall(payload);
      localStorage.setItem('token', JSON.stringify(token));

      return { user };
    } catch (err) {
      localStorage.removeItem('token');
      rejectWithValue(err as Error);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (payload: SignUpProps, { rejectWithValue }) => {
    try {
      const {
        data: { token, user },
      } = await signUpApiCall(payload);
      localStorage.setItem('token', JSON.stringify(token));

      return { user };
    } catch (err) {
      localStorage.removeItem('token');
      return rejectWithValue(err as Error);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/current',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await getUserByIdCall();
      
      return { user };
    } catch (err) {
      return rejectWithValue(err as Error);
    }
  }
);
