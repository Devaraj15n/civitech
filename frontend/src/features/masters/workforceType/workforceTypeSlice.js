import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWorkforceTypes, createWorkforceType, updateWorkforceType } from "./workforceTypeApi";

// Fetch all workforce types
export const fetchWorkforceTypes = createAsyncThunk(
  "workforceType/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getWorkforceTypes();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Save workforce type
export const saveWorkforceType = createAsyncThunk(
  "workforceType/save",
  async (payload, { rejectWithValue }) => {
    try {
      let res;
      if (payload.id) {
        res = await updateWorkforceType(payload.id, payload);
      } else {
        res = await createWorkforceType(payload);
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const workforceTypeSlice = createSlice({
  name: "workforceType",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkforceTypes.pending, (state) => { state.loading = true; })
      .addCase(fetchWorkforceTypes.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchWorkforceTypes.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(saveWorkforceType.pending, (state) => { state.loading = true; })
      .addCase(saveWorkforceType.fulfilled, (state) => { state.loading = false; })
      .addCase(saveWorkforceType.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default workforceTypeSlice.reducer;
