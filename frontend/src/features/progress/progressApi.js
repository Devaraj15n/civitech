import api from "../../api/axios";

/* ================= PROGRESS API ================= */

/**
 * Fetch all progress updates for a task
 * @param {number} taskId
 */
export const getProgress = (taskId) => api.get(`/project-progress/${taskId}`);

/**
 * Create a new progress entry
 * @param {object} data
 */
export const createProgress = (data) => api.post("/project-progress", data);

/**
 * Update an existing progress entry
 * @param {number} id
 * @param {object} data
 */
export const updateProgress = (id, data) => api.put(`/project-progress/${id}`, data);
