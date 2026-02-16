import api from "../../../api/axios";

/* ================= FETCH MESSAGES ================= */
export const getProgressMessagesByTaskId = (id, isSubtask = false) =>
    isSubtask
        ? api.get(`/subtask-progress-message/sub_task_id/${id}`)
        : api.get(`/progress-message/task/${id}`);

/* ================= CREATE MESSAGE ================= */
export const createProgressMessage = (data, isSubtask = false) =>
    isSubtask
        ? api.post("/subtask-progress-message", data)
        : api.post("/progress-message", data);

/* ================= DELETE MESSAGE ================= */
export const deleteProgressMessage = (id, isSubtask = false) =>
    isSubtask
        ? api.delete(`/subtask-progress-message/${id}`)
        : api.delete(`/progress-message/${id}`);

/* ================= UPLOAD FILE ================= */
export const uploadProgressFile = (formData, isSubtask = false) =>
    isSubtask
        ? api.post("/subtask-progress-files", formData)
        : api.post("/progress-files", formData);
