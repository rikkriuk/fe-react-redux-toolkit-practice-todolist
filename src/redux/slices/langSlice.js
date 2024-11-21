import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "en",
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    updateLang: (state, action) => {
      state.lang = action.payload.lang;
    },
  },
});

export const { updateLang } = langSlice.actions;
export default langSlice.reducer;
