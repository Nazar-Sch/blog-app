import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/reducer';
import postsReducer from './posts/reducer';

export const rootReducer = combineReducers({
  authReducer,
  postsReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = setupStore();
