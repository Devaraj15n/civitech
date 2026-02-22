import api from "../../../api/axios";

/* ---------------- GET PROJECT MEMBERS ---------------- */
export const getProjectMembers = (projectId) => {
  return api.get(`/project-parties/project/${projectId}`);
};

/* ---------------- ADD/REMOVE MEMBERS (Optional) ---------------- */
// export const addProjectMember = (data) => api.post("/project-parties", data);
// export const removeProjectMember = (id) => api.delete(`/project-parties/${id}`);