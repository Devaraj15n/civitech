import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProgressTimeline } from "./progressTimeLineAPI";

/* ================= FETCH ================= */
export const fetchProgressTimeline = createAsyncThunk(
    "progressTimeline/fetch",
    async ({ taskId, subTaskId }, { rejectWithValue }) => {
        try {
            const res = await getProgressTimeline({ taskId, subTaskId });
            return {
                key: taskId || subTaskId,
                data: Array.isArray(res.data?.data) ? res.data.data : [],
            };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= SLICE ================= */
const progressTimelineSlice = createSlice({
    name: "progressTimeline",
    initialState: {
        byId: {}, // { taskId | subTaskId : timeline[] }
        loading: false,
        error: null,
    },
    reducers: {
        clearProgressTimeline: (state, action) => {
            if (action.payload?.id) {
                delete state.byId[action.payload.id];
            } else {
                state.byId = {};
            }
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProgressTimeline.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProgressTimeline.fulfilled, (state, action) => {
                state.loading = false;
                const { key, data } = action.payload;
                state.byId[key] = data;
            })
            .addCase(fetchProgressTimeline.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProgressTimeline } = progressTimelineSlice.actions;
export default progressTimelineSlice.reducer;
