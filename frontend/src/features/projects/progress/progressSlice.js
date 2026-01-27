import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getProgressByTaskId,
    createProgress,
    updateProgress,
    deleteProgressApi,
} from "./progressApi";

/* ================= FETCH BY TASK ================= */
export const fetchProgress = createAsyncThunk(
    "progress/fetchByTask",
    async (taskId, { rejectWithValue }) => {
        if (!taskId) return [];

        try {
            const res = await getProgressByTaskId(taskId);
            const data = res.data?.data;
            console.log("Progress API response:", res.data);

            return Array.isArray(data) ? data : [];
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


/* ================= SAVE ================= */
export const saveProgress = createAsyncThunk(
    "progress/save",
    async (payload, { rejectWithValue }) => {
        try {
            const res = payload.id
                ? await updateProgress(payload.id, payload)
                : await createProgress(payload);

            return res.data?.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= DELETE ================= */
export const deleteProgress = createAsyncThunk(
    "progress/delete",
    async (id, { rejectWithValue }) => {
        try {
            await deleteProgressApi(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= SLICE ================= */
const progressSlice = createSlice({
    name: "progress",
    initialState: {
        list: [],        // ✅ ALWAYS ARRAY
        loading: false,
        error: null,
    },
    reducers: {
        clearProgress: (state) => {
            state.list = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* FETCH */
            .addCase(fetchProgress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProgress.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchProgress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.list = [];
            })

            /* SAVE */
            .addCase(saveProgress.fulfilled, (state, action) => {
                const record = action.payload;
                if (!record?.id) return;

                const index = state.list.findIndex((p) => p.id === record.id);
                if (index !== -1) {
                    state.list[index] = record;
                } else {
                    state.list.unshift(record);
                }
            })

            /* DELETE */
            .addCase(deleteProgress.fulfilled, (state, action) => {
                state.list = state.list.filter((p) => p.id !== action.payload);
            });
    },
});

export const { clearProgress } = progressSlice.actions;
export default progressSlice.reducer;
