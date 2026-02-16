import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getProgressMessagesByTaskId,
    createProgressMessage,
    uploadProgressFile,
} from "./progressMessageApi";

/* FETCH */
export const fetchProgressMessages = createAsyncThunk(
    "progressMessage/fetch",
    async ({ taskId, isSubtask }, { rejectWithValue }) => {
        try {
            const res = await getProgressMessagesByTaskId(taskId, isSubtask);
            return { taskId, data: res.data?.data || [] };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* SEND */
export const sendProgressMessage = createAsyncThunk(
    "progressMessage/send",
    async (
        { taskId, projectId, message, isSubtask },
        { rejectWithValue }
    ) => {
        try {
            const payload = {
                project_id: projectId,
                message,
            };

            if (isSubtask) {
                payload.sub_task_id = taskId;   // ✅ FIX
            } else {
                payload.task_id = taskId;
            }

            const res = await createProgressMessage(payload, isSubtask);

            return {
                taskId,
                message: res.data.data,
            };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);





const slice = createSlice({
    name: "progressMessage",
    initialState: {
        byTask: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProgressMessages.fulfilled, (state, action) => {
                state.byTask[action.payload.taskId] = action.payload.data;
            })
            .addCase(sendProgressMessage.fulfilled, (state, action) => {
                const { taskId, message } = action.payload;
                if (!state.byTask[taskId]) state.byTask[taskId] = [];
                state.byTask[taskId].push(message);
            })
            .addCase(deleteProgressMessage.fulfilled, (state, action) => {
                const { taskId, id } = action.payload;
                state.byTask[taskId] =
                    state.byTask[taskId]?.filter((m) => m.id !== id);
            });

    },
});


export const deleteProgressMessage = createAsyncThunk(
    "progressMessage/delete",
    async ({ id, taskId, isSubtask }, { rejectWithValue }) => {
        try {
            await api.delete(`/progress-messages/${id}?isSubtask=${isSubtask}`);
            return { id, taskId };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);



export default slice.reducer;
