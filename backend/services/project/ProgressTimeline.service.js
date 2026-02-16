const {
    progress_activity_timeline: Timeline,
    progress_tracking: Progress,
    progress_tracking_files: ProgressFiles,
    progress_tracking_message: Message,
    progress_tracking_message_file: MessageFile,
    sub_task_progress_tracking: SubProgress,
    sub_task_progress_tracking_files: SubProgressFiles,
    sub_task_progress_tracking_message: SubMessage,
    subtask_progress_message_file: SubMessageFile,
} = require("../../models");

module.exports = {
    /* ================= FIND ALL (TIMELINE) ================= */
    findAll: async (query, user) => {
        const { task_id, sub_task_id } = query;

        const timeline = await Timeline.findAll({
            where: {
                ...(task_id && { task_id }),
                ...(sub_task_id && { sub_task_id }),
            },
            order: [["created_at", "ASC"]],
        });

        return Promise.all(
            timeline.map(async (item) => {
                switch (item.activity_type) {
                    case "TASK_PROGRESS":
                        return {
                            type: "progress",
                            created_at: item.created_at,
                            data: await Progress.findByPk(item.reference_id, {
                                include: [
                                    {
                                        model: ProgressFiles,
                                        as: "files",
                                        required: false,
                                    },
                                ],
                            }),
                        };

                    case "TASK_MESSAGE":
                        return {
                            type: "message",
                            created_at: item.created_at,
                            data: await Message.findByPk(item.reference_id, {
                                include: [
                                    {
                                        model: MessageFile,
                                        as: "files",
                                        required: false,
                                    },
                                ],
                            }),
                        };

                    case "SUB_TASK_PROGRESS":
                        return {
                            type: "progress",
                            created_at: item.created_at,
                            data: await SubProgress.findByPk(item.reference_id, {
                                include: [
                                    {
                                        model: SubProgressFiles,
                                        as: "files",
                                        required: false,
                                    },
                                ],
                            }),
                        };

                    case "SUB_TASK_MESSAGE":
                        return {
                            type: "message",
                            created_at: item.created_at,
                            data: await SubMessage.findByPk(item.reference_id, {
                                include: [
                                    {
                                        model: SubMessageFile,
                                        as: "files",
                                        required: false,
                                    },
                                ],
                            }),
                        };

                    default:
                        return null;
                }
            })
        ).then((res) => res.filter(Boolean));
    },

    /* ================= FIND BY ID ================= */
    findById: async (id) => {
        return Timeline.findByPk(id);
    },

    /* ================= DELETE ================= */
    remove: async (id) => {
        return Timeline.destroy({
            where: { id },
        });
    },
};
