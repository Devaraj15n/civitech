const { sequelize, sub_task_progress_tracking_message: SubMessage, sub_task_activity_timeline: Timeline, sub_task: SubTask } = require("../../models");

module.exports = {
    create: async (data, user) => {
        if (!user?.id || !user?.client_id) throw new Error("User context is required");
        if (!data.sub_task_id) throw new Error("sub_task_id is required");
        if (!data.project_id) throw new Error("project_id is required");
        if (!data.message?.trim()) throw new Error("message is required");

        return sequelize.transaction(async (t) => {
            const subTask = await SubTask.findByPk(data.sub_task_id, { transaction: t });
            if (!subTask) throw new Error("Invalid sub_task_id");

            const message = await SubMessage.create({
                project_id: data.project_id,
                sub_task_id: data.sub_task_id,
                message: data.message,
                status: 1,
                created_by: user.id,
                updated_by: user.id,
            }, { transaction: t });

            // timeline entry
            await Timeline.create({
                project_id: data.project_id,
                sub_task_id: data.sub_task_id,
                task_id: subTask.task_id,
                activity_type: "SUB_TASK_MESSAGE",
                reference_id: message.id,
                created_by: user.id,
            }, { transaction: t });

            return message;
        });
    },

    findAll: (sub_task_id) => SubMessage.findAll({ where: { sub_task_id, status: 1 }, order: [["created_at", "ASC"]] }),
};
