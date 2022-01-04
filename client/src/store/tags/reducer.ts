import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTags } from "./services";
import { Tags, TagsState } from "./types";

export const initialState: TagsState = {
  tags: [],
  isLoading: false,
  error: '',
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: {
    [getTags.pending.type]: (
      state,
      action: PayloadAction<Tags[]>
    ) => {
      state.isLoading = true;
      state.error = "";
    },
    [getTags.fulfilled.type]: (
      state,
      action: PayloadAction<Tags[]>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.tags = action.payload;
    },
    [getTags.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default tagsSlice.reducer;
