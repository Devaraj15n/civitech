import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchProjects = createAsyncThunk(
  "project/fetchAll",
  async () => {
    const res = await api.get("/projects");
    return res.data;
  }
);

export const createProject = createAsyncThunk(
  "project/create",
  async (data) => {
    const res = await api.post("/projects", data);
    return res.data;
  }
);
