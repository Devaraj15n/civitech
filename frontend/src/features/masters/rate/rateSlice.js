import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRates, createRate, updateRate } from "./rateApi";

// Fetch all rates
export const fetchRates = createAsyncThunk("rate/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await getRates();
    return res.data.data; // adjust based on API response
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Save a rate (create/update)
export const saveRate = createAsyncThunk("rate/save", async (payload, { rejectWithValue }) => {
  try {
    let res;
    if (payload.id) {
      res = await updateRate(payload.id, payload);
    } else {
      res = await createRate(payload);
    }
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const rateSlice = createSlice({
  name: "rate",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, (state) => { state.loading = true; })
      .addCase(fetchRates.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchRates.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(saveRate.pending, (state) => { state.loading = true; })
      .addCase(saveRate.fulfilled, (state) => { state.loading = false; })
      .addCase(saveRate.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default rateSlice.reducer;
