import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTaskApi,
} from "./taskApi";

/* ================= FETCH ================= */
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await getTasksByProject(projectId);
      return res.data.data || res.data; // match your API response
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SAVE (CREATE/UPDATE) ================= */
export const saveTask = createAsyncThunk(
  "tasks/save",
  async (payload, { rejectWithValue }) => {
    try {
      let res;
      if (payload.id) {
        res = await updateTask(payload.id, payload);
      } else {
        res = await createTask(payload);
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTaskApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* SAVE */
      .addCase(saveTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        if (!updatedTask.id) return;
        const index = state.list.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          state.list[index] = updatedTask;
        } else {
          state.list.push(updatedTask);
        }
      })
      .addCase(saveTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
