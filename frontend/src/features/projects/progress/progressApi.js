import api from "../../../api/axios";

/* ================= FETCH ================= */
export const getProgressByTaskId = (id, isSubtask = false) => {
    return isSubtask
        ? api.get(`/sub-task-progress/sub-task/${id}`)
        : api.get(`/project-progress/task/${id}`);
};

export const getProgressById = (id, isSubtask = false) =>
    isSubtask
        ? api.get(`/sub-task-progress/${id}`)
        : api.get(`/project-progress/${id}`);

/* ================= CREATE ================= */
export const createProgress = (formData, isSubtask = false) => {
  return isSubtask
    ? api.post("/sub-task-progress", formData)
    : api.post("/project-progress", formData);
};


/* ================= UPDATE ================= */
export const updateProgress = (id, formData, isSubtask = false) => {
  return isSubtask
    ? api.put(`/sub-task-progress/${id}`, formData)
    : api.put(`/project-progress/${id}`, formData);
};


/* ================= DELETE ================= */
export const deleteProgressApi = (id, isSubtask = false) =>
    isSubtask
        ? api.delete(`/sub-task-progress/${id}`)
        : api.delete(`/project-progress/${id}`);
