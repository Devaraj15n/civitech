import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects, createProject } from "./projectThunk";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    list: [],
    loading: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  }
});

export default projectSlice.reducer;
