const { sequelize, progress_tracking_message: ProgressTrackingMessage } =
    require("../../models");
    const { progress_activity_timeline: Timeline } = require("../../models");


module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        return sequelize.transaction(async (t) => {
            const message = await ProgressTrackingMessage.create(
                {
                    project_id: data.project_id,
                    task_id: data.task_id,
                    message: data.message,
                    status: 1,
                    created_by: user.id,
                    updated_by: user.id,
                },
                { transaction: t }
            );
            await Timeline.create(
                {
                    project_id: data.project_id,
                    task_id: data.task_id,
                    activity_type: "TASK_MESSAGE",
                    reference_id: message.id,
                    created_by: user.id,
                },
                { transaction: t }
            );


            return message;
        });
    },

    /* ================= FIND ALL ================= */
    findAll: (query, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return ProgressTrackingMessage.findAll({
            where: {
                ...query,
                status: 1,
                // client_id: user.client_id
            },
            order: [["created_at", "ASC"]],
        });
    },

    /* ================= FIND BY ID ================= */
    findById: (id, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return ProgressTrackingMessage.findOne({
            where: {
                id,
                status: 1,
                // client_id: user.client_id
            },
        });
    },

    /* ================= FIND BY TASK ================= */
    findByTask: (task_id, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return ProgressTrackingMessage.findAll({
            where: {
                task_id,
                status: 1,
                // client_id: user.client_id
            },
            order: [["created_at", "ASC"]],
        });
    },


    /* ================= FIND BY TASK ================= */
    findByField: async (field, value, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return ProgressTrackingMessage.findAll({
            where: {
                [field]: value, // task_id or project_id
                status: 1,
                // client_id: user.client_id,
            },
            order: [["created_at", "ASC"]],
        });
    },


    /* ================= UPDATE ================= */
    update: async (id, data, user) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        return sequelize.transaction(async (t) => {
            const record = await ProgressTrackingMessage.findOne({
                where: {
                    id,
                    status: 1,
                    // client_id: user.client_id
                },
                transaction: t,
            });

            if (!record) {
                throw new Error("Message not found");
            }

            await record.update(
                {
                    message: data.message ?? record.message,
                    updated_by: user.id,
                },
                { transaction: t }
            );

            return record;
        });
    },

    /* ================= SOFT DELETE ================= */
    remove: (id, user) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        return ProgressTrackingMessage.update(
            {
                status: 0,
                updated_by: user.id,
            },
            {
                where: {
                    id,
                    // client_id: user.client_id
                },
            }
        );
    },
};
