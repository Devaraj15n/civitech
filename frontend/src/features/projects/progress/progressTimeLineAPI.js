import api from "../../../api/axios";

/**
 * Fetch progress timeline by task or sub-task
 * Backend uses getTimeline({ task_id, sub_task_id })
 */
export const getProgressTimeline = ({ taskId, subTaskId }) => {
    return api.get("/progress-timeline", {
        params: {
            ...(taskId && { task_id: taskId }),
            ...(subTaskId && { sub_task_id: subTaskId }),
        },
    });
};
