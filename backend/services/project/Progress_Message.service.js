const { sequelize, progress_tracking_message: ProgressTrackingMessage } = require("../../models");
const { progress_activity_timeline: Timeline, progress_tracking_message_file: MessageFile } = require("../../models");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        return sequelize.transaction(async (t) => {
            // 1️⃣ Create message
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

            // 2️⃣ Create message files if any
            if (data.files?.length > 0) {
                const filesData = data.files.map((f) => ({
                    message_id: message.id,
                    file_path: f.file_path,
                    file_type: f.file_type,
                    status: 1,
                    created_by: user.id,
                    updated_by: user.id,
                }));

                await MessageFile.bulkCreate(filesData, { transaction: t });
            }

            // 3️⃣ Create timeline entry
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

            // 4️⃣ Return message including files
            const fullMessage = await ProgressTrackingMessage.findOne({
                where: { id: message.id },
                include: [{ model: MessageFile, as: "files", where: { status: 1 }, required: false }],
                transaction: t,
            });

            return fullMessage;
        });
    },

    /* ================= FIND ALL ================= */
    findAll: (query, user) => {
        if (!user?.client_id) throw new Error("Client ID is required");

        return ProgressTrackingMessage.findAll({
            where: { ...query, status: 1 },
            include: [{ model: MessageFile, as: "files", where: { status: 1 }, required: false }],
            order: [["created_at", "ASC"]],
        });
    },

    /* ================= FIND BY ID ================= */
    findById: (id, user) => {
        if (!user?.client_id) throw new Error("Client ID is required");

        return ProgressTrackingMessage.findOne({
            where: { id, status: 1 },
            include: [{ model: MessageFile, as: "files", where: { status: 1 }, required: false }],
        });
    },

    /* ================= FIND BY TASK ================= */
    findByTask: (task_id, user) => {
        if (!user?.client_id) throw new Error("Client ID is required");

        return ProgressTrackingMessage.findAll({
            where: { task_id, status: 1 },
            include: [{ model: MessageFile, as: "files", where: { status: 1 }, required: false }],
            order: [["created_at", "ASC"]],
        });
    },

    /* ================= FIND BY FIELD ================= */
    findByField: async (field, value, user) => {
        if (!user?.client_id) throw new Error("Client ID is required");

        return ProgressTrackingMessage.findAll({
            where: { [field]: value, status: 1 },
            include: [{ model: MessageFile, as: "files", where: { status: 1 }, required: false }],
            order: [["created_at", "ASC"]],
        });
    },

    /* ================= UPDATE ================= */
    update: async (id, data, user) => {
        if (!user?.id || !user?.client_id) throw new Error("User context is required");

        return sequelize.transaction(async (t) => {
            const record = await ProgressTrackingMessage.findOne({
                where: { id, status: 1 },
                transaction: t,
            });

            if (!record) throw new Error("Message not found");

            await record.update(
                {
                    message: data.message ?? record.message,
                    updated_by: user.id,
                },
                { transaction: t }
            );

            // Optionally add/update files if passed
            if (data.files?.length > 0) {
                const filesData = data.files.map((f) => ({
                    message_id: id,
                    file_path: f.file_path,
                    file_type: f.file_type,
                    status: 1,
                    created_by: user.id,
                    updated_by: user.id,
                }));

                await MessageFile.bulkCreate(filesData, { transaction: t });
            }

            // Return updated message including files
            const fullMessage = await ProgressTrackingMessage.findOne({
                where: { id },
                include: [{ model: MessageFile, as: "files", where: { status: 1 }, required: false }],
                transaction: t,
            });

            return fullMessage;
        });
    },

    /* ================= SOFT DELETE ================= */
    remove: (id, user) => {
        if (!user?.id || !user?.client_id) throw new Error("User context is required");

        return sequelize.transaction(async (t) => {
            // Soft delete message
            await ProgressTrackingMessage.update(
                { status: 0, updated_by: user.id },
                { where: { id }, transaction: t }
            );

            // Soft delete associated files
            await MessageFile.update(
                { status: 0, updated_by: user.id },
                { where: { message_id: id }, transaction: t }
            );

            return { success: true };
        });
    },
};
