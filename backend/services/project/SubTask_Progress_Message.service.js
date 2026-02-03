const {
    sequelize,
    sub_task_progress_tracking_message: SubTaskProgressTrackingMessage,
} = require("../../models");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        return sequelize.transaction(async (t) => {
            const message = await SubTaskProgressTrackingMessage.create(
                {
                    project_id: data.project_id,
                    sub_task_id: data.sub_task_id,
                    message: data.message,
                    status: 1,
                    created_by: user.id,
                    updated_by: user.id,
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

        return SubTaskProgressTrackingMessage.findAll({
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

        return SubTaskProgressTrackingMessage.findOne({
            where: {
                id,
                status: 1,
                // client_id: user.client_id
            },
        });
    },

    /* ================= FIND BY SUB TASK ================= */
    findBySubTask: (sub_task_id, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return SubTaskProgressTrackingMessage.findAll({
            where: {
                sub_task_id,
                status: 1,
                // client_id: user.client_id
            },
            order: [["created_at", "ASC"]],
        });
    },


    /* ================= FIND BY SUB TASK ================= */
    findByField: async (field, value, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return SubTaskProgressTrackingMessage.findAll({
            where: {
                [field]: value, // sub_task_id or project_id
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
            const record = await SubTaskProgressTrackingMessage.findOne({
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

        return SubTaskProgressTrackingMessage.update(
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
