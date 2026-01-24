import api from "../../api/axios";

/* ---------------- GET ALL PROJECTS ---------------- */
export const getProjects = () => {
  return api.get("/projects"); // adjust endpoint
};

/* ---------------- CREATE PROJECT ---------------- */
export const createProject = (data) => {
  return api.post("/projects", data);
};

/* ---------------- UPDATE PROJECT ---------------- */
export const updateProject = (id, data) => {
  return api.put(`/projects/${id}`, data);
};

/* ---------------- DELETE PROJECT ---------------- */
export const deleteProjectApi = (id) => {
  return api.delete(`/projects/${id}`);
};
