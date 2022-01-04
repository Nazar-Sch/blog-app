import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/reducer';
import postsReducer from './posts/reducer';
import tagsReducer from './tags/reducer';

export const rootReducer = combineReducers({
  authReducer,
  postsReducer,
  tagsReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = setupStore();
