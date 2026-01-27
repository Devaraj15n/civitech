import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProjects,
  getProjectById, // ✅ MISSING IMPORT (FIXED)
  createProject,
  updateProject,
  deleteProjectApi,
} from "./projectApi";

/* ================= FETCH ALL ================= */
export const fetchProjects = createAsyncThunk(
  "project/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProjects();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= FETCH BY ID ================= */
export const fetchProjectById = createAsyncThunk(
  "project/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getProjectById(id);

      // console.log("res.data.data========");
      console.log(res.data.data);

      return res.data.data || null;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SAVE ================= */
export const saveProject = createAsyncThunk(
  "project/save",
  async (payload, { rejectWithValue }) => {
    try {
      let res;
      if (payload.id) {
        res = await updateProject(payload.id, payload);
        console.log(res + " if ");
      } else {
        res = await createProject(payload);
        console.log(res + " else ");
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
    current: null, // ✅ REQUIRED for project details
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ================= FETCH ALL ================= */
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

      /* ================= FETCH BY ID ================= */
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.current = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload; // ✅ THIS WAS MISSING
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= SAVE ================= */
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

      /* ================= DELETE ================= */
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
