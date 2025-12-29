import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload) => {
    const res = await api.post("/auth/login", payload);
    return res.data;
  }
);
