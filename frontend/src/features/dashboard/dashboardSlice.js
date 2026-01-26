// features/dashboard/dashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardSummary } from "./dashboardApi";

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getDashboardSummary();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    summary: null,
    statusChart: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.summary;
        state.statusChart = action.payload.statusChart;
      })
      .addCase(fetchDashboard.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;
