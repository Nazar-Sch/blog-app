import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { signin, signup, getUser} from "./services";
import { AuthState } from "./types";

export const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.isLoading = false;
      state.error = '';
      state.user = null;
      state.isLoggedIn = false;
    }
  },
  extraReducers: {
    [signin.fulfilled.type]: (
      state,
      action: PayloadAction<AuthState>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    [signin.rejected.type]: (
      state,
      action: PayloadAction<AuthState>
    ) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.user = null;
      state.isLoggedIn = false;
    },
    [signup.fulfilled.type]: (
      state,
      action: PayloadAction<AuthState>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    [signup.rejected.type]: (
      state,
      action: PayloadAction<AuthState>
    ) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.user = null;
      state.isLoggedIn = false;
    },
    [getUser.rejected.type]: (
      state,
      action: PayloadAction<AuthState>
    ) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.isLoggedIn = false;
    },
    [getUser.fulfilled.type]: (
      state,
      action: PayloadAction<AuthState>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
