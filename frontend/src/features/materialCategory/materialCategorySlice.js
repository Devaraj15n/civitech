import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMaterialCategories } from "./materialCategoryApi";

/* ================= THUNK ================= */
export const fetchMaterialCategories = createAsyncThunk(
  "materialCategory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMaterialCategories();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */
const materialCategorySlice = createSlice({
  name: "materialCategory",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterialCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaterialCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchMaterialCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default materialCategorySlice.reducer;
