import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { phone, password });
      return res.data; // { token, user }
    } catch (err) {
      // Proper error handling
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);
