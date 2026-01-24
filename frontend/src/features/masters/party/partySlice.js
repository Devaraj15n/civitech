import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getParties, savePartyApi } from "./partyApi";

/* ================= THUNKS ================= */

/* FETCH */
export const fetchParties = createAsyncThunk(
  "party/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getParties();
      // ✅ STORE ONLY ARRAY (UI SAFE)
      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* SAVE (CREATE / UPDATE) */
export const saveParty = createAsyncThunk(
  "party/save",
  async (data, { rejectWithValue }) => {
    try {
      const res = await savePartyApi(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */

const partySlice = createSlice({
  name: "party",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ================= FETCH ================= */
      .addCase(fetchParties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParties.fulfilled, (state, action) => {
        state.list = action.payload; // ✅ ALWAYS ARRAY
        state.loading = false;
      })
      .addCase(fetchParties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= SAVE ================= */
      .addCase(saveParty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveParty.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveParty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default partySlice.reducer;
