import api from "../../../api/axios";

/* ---------------- GET SUBTASKS BY TASK ---------------- */
export const getSubTasksByTask = (taskId) => {
  return api.get(`/tasks/${taskId}/sub-tasks`);
};

/* ---------------- CREATE SUBTASK ---------------- */
export const createSubTask = (data) => {
  return api.post("/sub-tasks", data);
};

/* ---------------- UPDATE SUBTASK ---------------- */
export const updateSubTask = (id, data) => {
  return api.put(`/sub-tasks/${id}`, data);
};

/* ---------------- DELETE SUBTASK ---------------- */
export const deleteSubTaskApi = (id) => {
  return api.delete(`/sub-tasks/${id}`);
};
