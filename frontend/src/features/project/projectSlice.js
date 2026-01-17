import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects, addProject } from "./projectThunk";

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
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  }
});

export default projectSlice.reducer;
