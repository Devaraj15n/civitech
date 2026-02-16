import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    uploadProgressTrackingFiles,
    getProgressTrackingFilesByTrackingId,
    deleteProgressTrackingFile,
} from "./progressTrackingFilesApi";

/* ================= FETCH BY TRACKING ID ================= */
export const fetchProgressTrackingFiles = createAsyncThunk(
    "progressTrackingFiles/fetch",
    async ({ trackingId, isSubtask = false }, { rejectWithValue }) => {
        try {
            if (!trackingId) {
                return { trackingId, data: [] };
            }

            const res = await getProgressTrackingFilesByTrackingId(
                trackingId,
                isSubtask
            );

            return {
                trackingId,
                data: Array.isArray(res.data?.data) ? res.data.data : [],
            };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= UPLOAD ================= */
export const uploadProgressFiles = createAsyncThunk(
    "progressTrackingFiles/upload",
    async ({ trackingId, files, isSubtask = false }, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            formData.append(
                isSubtask
                    ? "sub_task_progress_tracking_id"
                    : "progress_tracking_id",
                trackingId
            );

            files.forEach((file) => {
                formData.append("files", file);
            });

            const res = await uploadProgressTrackingFiles(
                formData,
                isSubtask
            );

            return {
                trackingId,
                files: Array.isArray(res.data?.data) ? res.data.data : [],
            };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= DELETE ================= */
export const deleteProgressFile = createAsyncThunk(
    "progressTrackingFiles/delete",
    async ({ id, trackingId, isSubtask = false }, { rejectWithValue }) => {
        try {
            await deleteProgressTrackingFile(id, isSubtask);
            return { id, trackingId };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= SLICE ================= */
const progressTrackingFilesSlice = createSlice({
    name: "progressTrackingFiles",
    initialState: {
        byTracking: {}, // { trackingId: [files] }
        loading: false,
        error: null,
    },
    reducers: {
        clearProgressTrackingFiles: (state, action) => {
            if (action.payload?.trackingId) {
                delete state.byTracking[action.payload.trackingId];
            } else {
                state.byTracking = {};
            }
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* FETCH */
            .addCase(fetchProgressTrackingFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProgressTrackingFiles.fulfilled, (state, action) => {
                state.loading = false;
                const { trackingId, data } = action.payload;
                state.byTracking[trackingId] = data;
            })
            .addCase(fetchProgressTrackingFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* UPLOAD */
            .addCase(uploadProgressFiles.fulfilled, (state, action) => {
                const { trackingId, files } = action.payload;

                if (!state.byTracking[trackingId]) {
                    state.byTracking[trackingId] = [];
                }

                state.byTracking[trackingId].push(...files);
            })

            /* DELETE */
            .addCase(deleteProgressFile.fulfilled, (state, action) => {
                const { id, trackingId } = action.payload;

                if (state.byTracking[trackingId]) {
                    state.byTracking[trackingId] =
                        state.byTracking[trackingId].filter(
                            (file) => file.id !== id
                        );
                }
            });
    },
});

export const { clearProgressTrackingFiles } =
    progressTrackingFilesSlice.actions;

export default progressTrackingFilesSlice.reducer;
