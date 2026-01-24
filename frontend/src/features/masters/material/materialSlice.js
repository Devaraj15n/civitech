import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "./materialApi";

/* ================= THUNKS ================= */

export const fetchMaterials = createAsyncThunk(
  "material/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMaterials();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const saveMaterial = createAsyncThunk(
  "material/save",
  async (data, { rejectWithValue }) => {
    try {
      const res = data.id
        ? await updateMaterial(data.id, data)
        : await createMaterial(data);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeMaterial = createAsyncThunk(
  "material/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteMaterial(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */

const materialSlice = createSlice({
  name: "material",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
  builder
    /* ================= FETCH ================= */
    .addCase(fetchMaterials.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchMaterials.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    })
    .addCase(fetchMaterials.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    /* ================= SAVE ================= */
    .addCase(saveMaterial.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(saveMaterial.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.list.findIndex(
        (m) => m.id === action.payload.id
      );
      if (index >= 0) {
        state.list[index] = action.payload;
      } else {
        state.list.push(action.payload);
      }
    })
    .addCase(saveMaterial.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload?.message ||
        action.payload ||
        "Material already exists";
    })

    /* ================= DELETE ================= */
    .addCase(removeMaterial.fulfilled, (state, action) => {
      state.list = state.list.filter(
        (m) => m.id !== action.payload
      );
    });
},
});

export default materialSlice.reducer;
