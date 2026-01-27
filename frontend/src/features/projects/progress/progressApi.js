import api from "../../../api/axios";

/* ================= FETCH ================= */
export const getProgressByTaskId = (taskId) =>
    api.get(`/project-progress/task/${taskId}`);

export const getProgressById = (id) =>
    api.get(`/project-progress/${id}`);

/* ================= CREATE ================= */
export const createProgress = (data) =>
    api.post("/project-progress", data);

/* ================= UPDATE ================= */
export const updateProgress = (id, data) =>
    api.put(`/project-progress/${id}`, data);

/* ================= DELETE ================= */
export const deleteProgressApi = (id) =>
    api.delete(`/project-progress/${id}`);
