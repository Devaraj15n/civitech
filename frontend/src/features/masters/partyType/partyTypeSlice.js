import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPartyTypes,
  createPartyType,
  updatePartyType,
} from "./partyTypeApi";

/* ================= FETCH ================= */
export const fetchPartyTypes = createAsyncThunk(
  "partyType/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPartyTypes();
      return res.data.data; // API structure
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SAVE ================= */
export const savePartyType = createAsyncThunk(
  "partyType/save",
  async (payload, { rejectWithValue }) => {
    try {
      let res;
      if (payload.id) {
        res = await updatePartyType(payload.id, payload);
      } else {
        res = await createPartyType(payload);
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const partyTypeSlice = createSlice({
  name: "partyType",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchPartyTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPartyTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPartyTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* SAVE */
      .addCase(savePartyType.pending, (state) => {
        state.loading = true;
      })
      .addCase(savePartyType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(savePartyType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default partyTypeSlice.reducer;
