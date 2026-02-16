import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getProgressMessagesByTaskId,
    createProgressMessage,
    uploadProgressFile,
    deleteProgressMessage,
} from "./progressMessageApi";

/* ================= FETCH MESSAGES ================= */
export const fetchProgressMessages = createAsyncThunk(
    "progressMessage/fetch",
    async ({ taskId, isSubtask }, { rejectWithValue }) => {
        try {
            const res = await getProgressMessagesByTaskId(taskId, isSubtask);
            return { taskId, data: res.data || [] };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= SEND MESSAGE + FILES ================= */
export const sendProgressMessage = createAsyncThunk(
    "progressMessage/send",
    async (
        { taskId, projectId, message, selectedImages = [], isSubtask },
        { rejectWithValue }
    ) => {
        try {
            // 1️⃣ Create the message
            const payload = {
                project_id: projectId,
                message: message || "",
            };
            if (isSubtask) payload.sub_task_id = taskId;
            else payload.task_id = taskId;

            const res = await createProgressMessage(payload, isSubtask);
            const createdMessage = res.data || res.data?.data;

            // 2️⃣ Upload images if any
            let uploadedFiles = [];
            // if (selectedImages.length > 0) {
            //     const formData = new FormData();
            //     selectedImages.forEach((file) => formData.append("files", file));
            //     formData.append("message_id", createdMessage.id);

            //     const fileRes = await uploadProgressFile(formData, isSubtask);
            //     uploadedFiles = fileRes.data || fileRes.data?.data || [];
            // }

            // 3️⃣ Attach files to message
            createdMessage.files = uploadedFiles;

            return { taskId, message: createdMessage };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= DELETE MESSAGE ================= */
export const deleteProgressMessageThunk = createAsyncThunk(
    "progressMessage/delete",
    async ({ id, taskId, isSubtask }, { rejectWithValue }) => {
        try {
            await deleteProgressMessage(id, isSubtask);
            return { id, taskId };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= DELETE FILE ================= */
export const deleteProgressFile = createAsyncThunk(
    "progressMessage/deleteFile",
    async ({ id, taskId, isSubtask }, { rejectWithValue }) => {
        try {
            await api.delete(
                isSubtask
                    ? `/subtask-progress-files/${id}`
                    : `/progress-files/${id}`
            );
            return { fileId: id, taskId };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* ================= SLICE ================= */
const slice = createSlice({
    name: "progressMessage",
    initialState: {
        byTask: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch messages
            .addCase(fetchProgressMessages.fulfilled, (state, action) => {
                state.byTask[action.payload.taskId] = action.payload.data;
            })
            // Send message + files
            .addCase(sendProgressMessage.fulfilled, (state, action) => {
                const { taskId, message } = action.payload;
                if (!state.byTask[taskId]) state.byTask[taskId] = [];
                state.byTask[taskId].push(message);
            })
            // Delete message
            .addCase(deleteProgressMessageThunk.fulfilled, (state, action) => {
                const { taskId, id } = action.payload;
                state.byTask[taskId] = state.byTask[taskId]?.filter(
                    (m) => m.id !== id
                );
            })
            // Delete single file from message
            .addCase(deleteProgressFile.fulfilled, (state, action) => {
                const { taskId, fileId } = action.payload;
                if (!state.byTask[taskId]) return;

                state.byTask[taskId] = state.byTask[taskId].map((m) => {
                    if (!m.files) return m;
                    return {
                        ...m,
                        files: m.files.filter((f) => f.id !== fileId),
                    };
                });
            });
    },
});

export default slice.reducer;
