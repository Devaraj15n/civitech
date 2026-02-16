import api from "../../../api/axios";

/* ================= FETCH ================= */

export const getProgressTrackingFilesByTrackingId = (
    trackingId,
    isSubtask = false
) => {
    if (!trackingId) {
        return Promise.resolve({ data: { data: [] } });
    }

    return isSubtask
        ? api.get(`/sub-task-progress-files/${trackingId}/sub-tasks`)
        : api.get("/progress-files", {
            params: { progress_tracking_id: trackingId },
        });
};


/* ================= UPLOAD ================= */

export const uploadProgressTrackingFiles = (
    formData,
    isSubtask = false
) => {
    return isSubtask
        ? api.post("/sub-task-progress-files", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        : api.post("/progress-files", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
};


/* ================= DELETE ================= */

export const deleteProgressTrackingFile = (
    id,
    isSubtask = false
) => {
    return isSubtask
        ? api.delete(`/sub-task-progress-files/${id}`)
        : api.delete(`/progress-files/${id}`);
};
