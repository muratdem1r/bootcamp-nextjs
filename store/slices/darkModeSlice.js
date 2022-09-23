import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    switchDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { switchDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
