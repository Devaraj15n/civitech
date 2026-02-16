const {
    sub_task_activity_timeline: Timeline,
    sub_task_progress_tracking: SubProgress,
    sub_task_progress_tracking_files: SubProgressFiles,
    sub_task_progress_tracking_message: SubMessage,
} = require("../../models");

module.exports = {
    findAllBySubTask: async (sub_task_id) => {
        const timeline = await Timeline.findAll({
            where: { sub_task_id },
            order: [["created_at", "ASC"]],
        });

        const result = await Promise.all(
            timeline.map(async (item) => {
                switch (item.activity_type) {
                    case "SUB_TASK_PROGRESS":
                        const progress = await SubProgress.findByPk(item.reference_id, { include: [{ model: SubFiles, as: "files", required: false }] });
                        if (!progress) return null;
                        return { id: item.id, type: "progress", created_at: item.created_at, data: progress };

                    case "SUB_TASK_PROGRESS_FILE":
                        const file = await SubFiles.findByPk(item.reference_id);
                        if (!file) return null;
                        return { id: item.id, type: "file", created_at: item.created_at, data: file };

                    case "SUB_TASK_MESSAGE":
                        const message = await SubMessage.findByPk(item.reference_id);
                        if (!message) return null;
                        return { id: item.id, type: "message", created_at: item.created_at, data: message };

                    default: return null;
                }
            })
        );

        return result.filter(Boolean);
    },
    /* ================= FIND BY FIELD ================= */
    findByField : async (fieldName, value, user) => {
        if (!fieldName || !value) return [];

        const timeline = await Timeline.findAll({
            where: { [fieldName]: value },
            order: [["created_at", "ASC"]],
        });

        return Promise.all(
            timeline.map(async (item) => {
                switch (item.activity_type) {
                    case "SUB_TASK_PROGRESS":
                        return {
                            type: "progress",
                            created_at: item.created_at,
                            data: await SubProgress.findByPk(item.reference_id, {
                                include: [{ model: SubProgressFiles, as: "files", required: false }],
                            }),
                        };
                    case "SUB_TASK_MESSAGE":
                        return {
                            type: "message",
                            created_at: item.created_at,
                            data: await SubMessage.findByPk(item.reference_id),
                        };
                    default:
                        return null;
                }
            })
        ).then((res) => res.filter(Boolean));
    }
};
