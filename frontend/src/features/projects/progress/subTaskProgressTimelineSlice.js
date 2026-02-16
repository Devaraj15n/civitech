import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubTaskProgressTimeline } from "./subTaskProgressTimelineAPI";

/* =========================================================
   FETCH SUB-TASK TIMELINE
========================================================= */
export const fetchSubTaskProgressTimeline = createAsyncThunk(
    "subTaskProgressTimeline/fetch",
    async ({ subTaskId }, { rejectWithValue }) => {
        try {
            if (!subTaskId) throw new Error("subTaskId is required");

            const res = await getSubTaskProgressTimeline({ subTaskId });

            return {
                subTaskId,
                data: Array.isArray(res.data?.data) ? res.data.data : [],
            };
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || err.message
            );
        }
    }
);

/* =========================================================
   SLICE
========================================================= */
const subTaskProgressTimelineSlice = createSlice({
    name: "subTaskProgressTimeline",
    initialState: {
        byId: {},          // { [subTaskId]: timeline[] }
        loadingById: {},   // { [subTaskId]: boolean }
        error: null,
    },

    reducers: {
        clearSubTaskProgressTimeline: (state, action) => {
            const { subTaskId } = action.payload || {};

            if (subTaskId) {
                delete state.byId[subTaskId];
                delete state.loadingById[subTaskId];
            } else {
                state.byId = {};
                state.loadingById = {};
            }

            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSubTaskProgressTimeline.pending, (state, action) => {
                const { subTaskId } = action.meta.arg;
                state.loadingById[subTaskId] = true;
                state.error = null;
            })

            .addCase(fetchSubTaskProgressTimeline.fulfilled, (state, action) => {
                const { subTaskId, data } = action.payload;

                state.loadingById[subTaskId] = false;
                state.byId[subTaskId] = data.sort(
                    (a, b) =>
                        new Date(a.created_at) - new Date(b.created_at)
                );
            })

            .addCase(fetchSubTaskProgressTimeline.rejected, (state, action) => {
                const { subTaskId } = action.meta.arg;
                state.loadingById[subTaskId] = false;
                state.error = action.payload;
            });
    },
});

/* =========================================================
   EXPORTS
========================================================= */
export const { clearSubTaskProgressTimeline } =
    subTaskProgressTimelineSlice.actions;

export default subTaskProgressTimelineSlice.reducer;
