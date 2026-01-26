import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSubTasksByTask,
  createSubTask,
  updateSubTask,
  deleteSubTaskApi,
} from "./subTaskApi";

/* ================= FETCH ================= */
export const fetchSubTasks = createAsyncThunk(
  "subtasks/fetch",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await getSubTasksByTask(taskId);
      return {
        taskId,
        list: res.data.data || res.data,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SAVE (CREATE / UPDATE) ================= */
export const saveSubTask = createAsyncThunk(
  "subtasks/save",
  async (payload, { rejectWithValue }) => {
    try {
      let res;
      if (payload.id) {
        res = await updateSubTask(payload.id, payload);
      } else {
        res = await createSubTask(payload);
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteSubTask = createAsyncThunk(
  "subtasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteSubTaskApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */
const subTaskSlice = createSlice({
  name: "subtasks",
  initialState: {
    byTask: {}, // { taskId: [] }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchSubTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.byTask[action.payload.taskId] = action.payload.list;
      })
      .addCase(fetchSubTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* SAVE */
      .addCase(saveSubTask.fulfilled, (state, action) => {
        const subTask = action.payload;
        const taskId = subTask.parent_task_id;

        if (!state.byTask[taskId]) {
          state.byTask[taskId] = [];
        }

        const index = state.byTask[taskId].findIndex(
          (s) => s.id === subTask.id
        );

        if (index !== -1) {
          state.byTask[taskId][index] = subTask;
        } else {
          state.byTask[taskId].push(subTask);
        }
      })

      /* DELETE */
      .addCase(deleteSubTask.fulfilled, (state, action) => {
        Object.keys(state.byTask).forEach((taskId) => {
          state.byTask[taskId] = state.byTask[taskId].filter(
            (s) => s.id !== action.payload
          );
        });
      });
  },
});

export default subTaskSlice.reducer;
