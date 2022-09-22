import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../slices/tabSlice";
import modalReducer from "../slices/modalSlice";
import modeReducer from "../slices/modeSlice";

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    modal: modalReducer,
    mode: modeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
