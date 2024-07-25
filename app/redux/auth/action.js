import { successResponse } from "@/app/helpers";
import { REGISTRATION } from "../../utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const Registration = createAsyncThunk(
  "auth/admin-registration",
  async (payload) => {
    console.log(payload);
    try {
      const data = await axios.post(REGISTRATION, payload);
      console.log(data);
      return successResponse(data.data, null);
    } catch (error) {
      return successResponse(null, error.response.data);
    }
  }
);
