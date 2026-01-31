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
    async ({ taskId, isSubtask = false }, { rejectWithValue }) => {
        try {
            const res = await getProgressByTaskId(taskId, isSubtask);
            return {
                taskId,
                data: Array.isArray(res.data?.data) ? res.data.data : [],
            };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= FETCH MAIN TASK AGGREGATED ================= */
export const fetchTaskProgress = createAsyncThunk(
    "progress/fetchTaskProgress",
    async ({ taskId }, { rejectWithValue }) => {
        try {
            const res = await getProgressByTaskId(taskId, true); // fetch subtasks
            const progressList = Array.isArray(res.data?.data) ? res.data.data : [];

            let avgProgress = 0;
            if (progressList.length > 0) {
                const total = progressList.reduce(
                    (sum, p) => sum + (p.progress_quantity || 0),
                    0
                );
                avgProgress = Math.round(total / progressList.length);
            }

            return { taskId, progress_percentage: avgProgress };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= SAVE ================= */
export const saveProgress = createAsyncThunk(
    "progress/save",
    async ({ data, isSubtask = false }, { rejectWithValue }) => {
        try {
            const res = data.id
                ? await updateProgress(data.id, data, isSubtask)
                : await createProgress(data, isSubtask);

            return { taskId: data.task_id, progress: res.data?.data };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


/* ================= DELETE ================= */
export const deleteProgress = createAsyncThunk(
    "progress/delete",
    async ({ id, taskId }, { rejectWithValue }) => {
        try {
            await deleteProgressApi(id);
            return { id, taskId };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= SLICE ================= */
const progressSlice = createSlice({
    name: "progress",
    initialState: {
        byTask: {}, // store progress keyed by taskId
        mainTaskProgress: {}, // aggregated progress per main task
        loading: false,
        error: null,
    },
    reducers: {
        clearProgress: (state, action) => {
            if (action.payload?.taskId) {
                delete state.byTask[action.payload.taskId];
            } else {
                state.byTask = {};
                state.mainTaskProgress = {};
            }
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchProgress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProgress.fulfilled, (state, action) => {
                state.loading = false;
                const { taskId, data } = action.payload;
                state.byTask[taskId] = data;
            })
            .addCase(fetchProgress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // FETCH AGGREGATED
            .addCase(fetchTaskProgress.fulfilled, (state, action) => {
                const { taskId, progress_percentage } = action.payload;
                state.mainTaskProgress[taskId] = progress_percentage || 0;
            })

            // SAVE
            .addCase(saveProgress.fulfilled, (state, action) => {
                const { taskId, progress } = action.payload;
                if (!progress?.id) return;

                if (!state.byTask[taskId]) state.byTask[taskId] = [];

                const index = state.byTask[taskId].findIndex((p) => p.id === progress.id);
                if (index !== -1) {
                    state.byTask[taskId][index] = progress;
                } else {
                    state.byTask[taskId].unshift(progress);
                }
            })


            // DELETE
            .addCase(deleteProgress.fulfilled, (state, action) => {
                const { taskId, id } = action.payload;
                if (state.byTask[taskId]) {
                    state.byTask[taskId] = state.byTask[taskId].filter((p) => p.id !== id);
                }
            });
    },
});

export const { clearProgress } = progressSlice.actions;
export default progressSlice.reducer;
