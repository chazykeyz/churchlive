import { createSlice } from "@reduxjs/toolkit";
import { Registration } from "./action";
import * as SecureStore from "expo-secure-store";

const getAccessToken = async () => {
  return await SecureStore.getItemAsync("accessToken");
};

const initialState = {
  loading: false,
  errors: null,
  userInfo: null,
  isAthenticated: getAccessToken ? true : false,
};

const authReducer = createSlice({
  name: "auth-reducer",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(Registration.pending, (state) => {
        state.loading = true;
      })
      .addCase(Registration.fulfilled, (state, action) => {
        state.errors = action?.payload?.errors;
        state.loading = false;
      })
      .addCase(Registration.rejected, (state, action) => {
        console.log(action.payload);
        state.errors = action?.payload?.errors;
        state.loading = false;
      });
  },
});

export default authReducer.reducer;
