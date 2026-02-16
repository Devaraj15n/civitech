const {
    sequelize,
    sub_task_progress_tracking_message: SubMessage,
    subtask_progress_message_file: SubMessageFile,
    sub_task_activity_timeline: Timeline,
    sub_task: SubTask,
} = require("../../models");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user) => {
        if (!data) throw new Error("Data is required");
        if (!user?.id || !user?.client_id) throw new Error("User context is required");
        if (!data.sub_task_id) throw new Error("sub_task_id is required");
        if (!data.project_id) throw new Error("project_id is required");
        if (!data.message?.trim() && (!data.files || data.files.length === 0)) {
            throw new Error("Either message or files are required");
        }


        return sequelize.transaction(async (t) => {
            // 1️⃣ Validate sub-task
            const subTask = await SubTask.findByPk(data.sub_task_id, { transaction: t });
            if (!subTask) throw new Error("Invalid sub_task_id");

            // 2️⃣ Create message
            const message = await SubMessage.create(
                {
                    project_id: data.project_id,
                    sub_task_id: data.sub_task_id,
                    message: data.message || "",
                    status: 1,
                    created_by: user.id,
                    updated_by: user.id,
                },
                { transaction: t }
            );

            // 3️⃣ Create timeline entry
            await Timeline.create(
                {
                    project_id: data.project_id,
                    sub_task_id: data.sub_task_id,
                    task_id: subTask.task_id,
                    activity_type: "SUB_TASK_MESSAGE",
                    reference_id: message.id,
                    created_by: user.id,
                },
                { transaction: t }
            );

            // 4️⃣ Create message files if any
            if (data.files?.length > 0) {
                const filesData = data.files.map((f) => ({
                    message_id: message.id,
                    file_path: f.file_path,
                    file_type: f.file_type,
                    status: 1,
                    created_by: user.id,
                    updated_by: user.id,
                }));
                await SubMessageFile.bulkCreate(filesData, { transaction: t });
            }

            // 5️⃣ Return message including files
            return SubMessage.findOne({
                where: { id: message.id },
                include: [{ model: SubMessageFile, as: "files", where: { status: 1 }, required: false }],
                transaction: t,
            });
        });
    },

    /* ================= FIND ALL ================= */
    findAll: (query, user) => {
        if (!user?.client_id) throw new Error("Client ID is required");

        return SubMessage.findAll({
            where: { ...query, status: 1 },
            include: [{ model: SubMessageFile, as: "files", where: { status: 1 }, required: false }],
            order: [["created_at", "ASC"]],
        });
    },

    /* ================= FIND BY ID ================= */
    findById: (id, user) => {
        if (!user?.client_id) throw new Error("Client ID is required");

        return SubMessage.findOne({
            where: { id, status: 1 },
            include: [{ model: SubMessageFile, as: "files", where: { status: 1 }, required: false }],
        });
    },

    /* ================= FIND BY SUBTASK ================= */
    findBySubTask: (sub_task_id, user) => {
        if (!user?.client_id) throw new Error("Client ID is required");

        return SubMessage.findAll({
            where: { sub_task_id, status: 1 },
            include: [{ model: SubMessageFile, as: "files", where: { status: 1 }, required: false }],
            order: [["created_at", "ASC"]],
        });
    },

    /* ================= FIND BY FIELD ================= */
    findByField: (field, value, user) => {
        if (!user?.client_id) throw new Error("Client ID is required");

        return SubMessage.findAll({
            where: { [field]: value, status: 1 },
            include: [{ model: SubMessageFile, as: "files", where: { status: 1 }, required: false }],
            order: [["created_at", "ASC"]],
        });
    },

    /* ================= UPDATE ================= */
    update: async (id, data, user) => {
        if (!user?.id || !user?.client_id) throw new Error("User context is required");

        return sequelize.transaction(async (t) => {
            const message = await SubMessage.findOne({ where: { id, status: 1 }, transaction: t });
            if (!message) throw new Error("Message not found");

            await message.update(
                { message: data.message ?? message.message, updated_by: user.id },
                { transaction: t }
            );

            // Optionally add files
            if (data.files?.length > 0) {
                const filesData = data.files.map((f) => ({
                    message_id: id,
                    file_path: f.file_path,
                    file_type: f.file_type,
                    status: 1,
                    created_by: user.id,
                    updated_by: user.id,
                }));
                await SubMessageFile.bulkCreate(filesData, { transaction: t });
            }

            return SubMessage.findOne({
                where: { id },
                include: [{ model: SubMessageFile, as: "files", where: { status: 1 }, required: false }],
                transaction: t,
            });
        });
    },

    /* ================= SOFT DELETE ================= */
    remove: (id, user) => {
        if (!user?.id || !user?.client_id) throw new Error("User context is required");

        return sequelize.transaction(async (t) => {
            await SubMessage.update({ status: 0, updated_by: user.id }, { where: { id }, transaction: t });
            await SubMessageFile.update(
                { status: 0, updated_by: user.id },
                { where: { message_id: id }, transaction: t }
            );
            return { success: true };
        });
    },
};
