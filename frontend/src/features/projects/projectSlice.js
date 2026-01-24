import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProjectApi,
} from "./projectApi";

/* ================= FETCH ================= */
export const fetchProjects = createAsyncThunk(
  "project/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProjects();
      return res.data.data; // match your API response
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SAVE (CREATE/UPDATE) ================= */
export const saveProject = createAsyncThunk(
  "project/save",
  async (payload, { rejectWithValue }) => {
    try {
      let res;
      if (payload.id) {
        res = await updateProject(payload.id, payload);
      } else {
        res = await createProject(payload);
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteProject = createAsyncThunk(
  "project/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProjectApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */
const projectSlice = createSlice({
  name: "project",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* SAVE */
      .addCase(saveProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
