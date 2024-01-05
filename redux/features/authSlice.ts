import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  user: {
    email: "",
    url: "",
    name: "",
    uid: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handelUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handelUser } = authSlice.actions;

export default authSlice.reducer;
