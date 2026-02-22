import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProjectMembers } from "./projectPartyApi";

/* ---------------- FETCH MEMBERS BY PROJECT ---------------- */
export const fetchProjectMembers = createAsyncThunk(
  "projectParties/fetch",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await getProjectMembers(projectId);
      return res.data; // assuming API returns array of members
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const projectPartySlice = createSlice({
  name: "projectParties",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProjectMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectPartySlice.reducer;