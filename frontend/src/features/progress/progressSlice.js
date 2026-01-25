import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProgress, createProgress, updateProgress } from "./progressApi";

/* ================= THUNKS ================= */

// Fetch progress for a task
export const fetchProgress = createAsyncThunk(
  "progress/fetch",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await getProgress(taskId);
      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Save progress
export const saveProgress = createAsyncThunk(
  "progress/save",
  async (payload, { rejectWithValue }) => {
    try {
      let res;
      if (payload.id) {
        res = await updateProgress(payload.id, payload);
      } else {
        res = await createProgress(payload);
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProgress.fulfilled, (state, action) => {
        // Prepend new progress
        state.list = [action.payload, ...state.list];
        state.loading = false;
      })
      .addCase(saveProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export the reducer as default for rootReducer
export default progressSlice.reducer;
