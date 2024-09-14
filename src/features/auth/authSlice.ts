import { createSlice } from "@reduxjs/toolkit";

const emptyTokens = {
  email: "",
  accesstoken: "",
  uid:""
};

const authSlice = createSlice({
  name: "auth",
  initialState: emptyTokens,
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email;
      state.accesstoken = action.payload.accesstoken;
      state.uid = action.payload.uid;
    }
  },
});

export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;