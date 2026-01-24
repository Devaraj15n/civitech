import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCostCodes,
  createCostCode,
  updateCostCode,
} from "./costCodeApi";

/* ================= FETCH ================= */
export const fetchCostCodes = createAsyncThunk(
  "costCode/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCostCodes();
      return res.data.data; // ✅ same API structure
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SAVE ================= */
export const saveCostCode = createAsyncThunk(
  "costCode/save",
  async (payload, { rejectWithValue }) => {
    try {
      let res;
      if (payload.id) {
        res = await updateCostCode(payload.id, payload);
      } else {
        res = await createCostCode(payload);
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const costCodeSlice = createSlice({
  name: "costCode",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchCostCodes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCostCodes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCostCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* SAVE */
      .addCase(saveCostCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveCostCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveCostCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default costCodeSlice.reducer;
