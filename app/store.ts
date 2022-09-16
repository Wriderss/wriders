import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../slices/tabSlice";
import modalReducer from "../slices/modalSlice";

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
