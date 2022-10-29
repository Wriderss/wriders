import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from "../slices/modalSlice";
import modeReducer from "../slices/modeSlice";
import commentReducer from "../slices/commentSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    mode: modeReducer,
    commentState: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
