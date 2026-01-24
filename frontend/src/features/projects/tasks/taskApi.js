import api from "../../../api/axios";

/* ---------------- GET TASKS BY PROJECT ---------------- */
export const getTasksByProject = (projectId) => {
  return api.get(`/projects/${projectId}/tasks`);
};

/* ---------------- CREATE TASK ---------------- */
export const createTask = (data) => {
  return api.post("/tasks", data); // adjust endpoint
};

/* ---------------- UPDATE TASK ---------------- */
export const updateTask = (id, data) => {
  return api.put(`/tasks/${id}`, data); // adjust endpoint
};

/* ---------------- DELETE TASK ---------------- */
export const deleteTaskApi = (id) => {
  return api.delete(`/tasks/${id}`); // adjust endpoint
};
