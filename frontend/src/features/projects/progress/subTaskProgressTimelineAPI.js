import api from "../../../api/axios";

/* =========================================================
   FETCH TIMELINE BY SUB-TASK
   GET /api/sub-task-timeline/sub-task/:sub_task_id
========================================================= */
export const getSubTaskProgressTimeline = ({ subTaskId }) => {
    if (!subTaskId) {
        throw new Error("subTaskId is required");
    }

    return api.get(`/subtask-progress-timeline/sub-task/${subTaskId}`);
};

/* =========================================================
   CREATE TIMELINE ENTRY
   POST /api/sub-task-timeline
========================================================= */
export const createSubTaskTimeline = (payload) => {
    /*
      payload example:
      {
        project_id,
        sub_task_id,
        activity_type,
        reference_id
      }
    */
    if (!payload?.sub_task_id) {
        throw new Error("sub_task_id is required");
    }

    return api.post("/subtask-progress-timeline", payload);
};

/* =========================================================
   UPDATE TIMELINE ENTRY
   PUT /api/sub-task-timeline/:id
========================================================= */
export const updateSubTaskTimeline = ({ id, data }) => {
    if (!id) {
        throw new Error("Timeline id is required");
    }

    return api.put(`/subtask-progress-timeline/${id}`, data);
};

/* =========================================================
   DELETE TIMELINE ENTRY
   DELETE /api/sub-task-timeline/:id
========================================================= */
export const deleteSubTaskTimeline = ({ id }) => {
    if (!id) {
        throw new Error("Timeline id is required");
    }

    return api.delete(`/subtask-progress-timeline/${id}`);
};
