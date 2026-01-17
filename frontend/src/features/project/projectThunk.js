import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./projectApi";

export const fetchProjects = createAsyncThunk(
  "project/fetch",
  async () => {
    const res = await api.getProjects();
    return res.data;
  }
);

export const addProject = createAsyncThunk(
  "project/add",
  async (data) => {
    const res = await api.createProject(data);
    return res.data;
  }
);
