import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface Modal {
  ModalState: boolean;
}

const initialState: Modal = {
  ModalState: false,
};

export const modalSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    modalOpen: (state) => {
      state.ModalState = true;
    },
    modalClose: (state) => {
      state.ModalState = false;
    },
  },
});

export const { modalClose, modalOpen } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal.ModalState;

export default modalSlice.reducer;
