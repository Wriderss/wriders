import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface Tab {
  tabName: String;
}

const initialState: Tab = {
  tabName: "following",
};

export const tabSlice = createSlice({
  name: "Tab",
  initialState,
  reducers: {
    changeTabToFollowing: (state, action) => {
      state.tabName = "following";
    },
    changeTabToRecommended: (state, action) => {
      state.tabName = "recommended";
    },
  },
});

export const { changeTabToFollowing, changeTabToRecommended } =
  tabSlice.actions;

export const selectTab = (state: RootState) => state.tab.tabName;

export default tabSlice.reducer;
