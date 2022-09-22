import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface Mode {
  ModeState: boolean;
}

const initialState: Mode = {
  ModeState: false,
};

export const modeSlice = createSlice({
  name: "Mode",
  initialState,
  reducers: {
    ChangeMode: (state) => {
      state.ModeState = !state.ModeState;
    },
  },
});

export const { ChangeMode } = modeSlice.actions;
export const selectModal = (state: RootState) => state.modal.ModalState;
export default modeSlice.reducer;
