import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface Comment {
  CommentState: boolean;
}

const initialState: Comment = {
  CommentState: false,
};

export const CommentSlice = createSlice({
  name: "Comment",
  initialState,
  reducers: {
    changeCommentState: (state) => {
      state.CommentState = !state.CommentState;
    },
  },
});

export const { changeCommentState } = CommentSlice.actions;

export const selectComment = (state: RootState) =>
  state.commentState.CommentState;

export default CommentSlice.reducer;
