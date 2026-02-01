const base = require("../base.service");
const {
    sequelize,
    sub_task_progress_tracking: SubTaskProgressTracking,
    sub_task_progress_tracking_files: SubTaskProgressTrackingFiles,
} = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user, files = []) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        return sequelize.transaction(async (t) => {
            const progress = await SubTaskProgressTracking.create(
                {
                    project_id: data.project_id,
                    sub_task_id: data.sub_task_id,
                    progress_date: data.progress_date,
                    progress_quantity: data.progress_quantity,
                    progress_percentage: data.progress_percentage ?? 0.0,
                    remarks: data.remarks ?? null,
                    location: data.location ?? null,
                    client_id: user.client_id,
                    status: 1,
                    created_by: user.id,
                    updated_by: user.id,
                },
                { transaction: t }
            );

            if (files.length > 0) {
                const filePayload = files.map((file) => ({
                    sub_task_progress_tracking_id: progress.id,
                    file_name: file.originalname,
                    file_path: `uploads/progress/${file.filename}`, 
                    file_type: file.mimetype,
                    file_size: file.size,
                    uploaded_by: user.id,
                    status: 1,
                }));

                await SubTaskProgressTrackingFiles.bulkCreate(filePayload, {
                    transaction: t,
                });
            }

            return progress;
        });
    },

    /* ================= FIND ALL ================= */
    findAll: (query, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return SubTaskProgressTracking.findAll({
            where: {
                ...query,
                status: 1,
                // client_id: user.client_id,
            },
            include: [
                {
                    model: SubTaskProgressTrackingFiles,
                    as: "files",
                    where: { status: 1 },
                    required: false,
                },
            ],
            order: [["progress_date", "DESC"]],
        });
    },

    /* ================= FIND BY ID ================= */
    findById: async (id, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return SubTaskProgressTracking.findOne({
            where: {
                id,
                status: 1,
                // client_id: user.client_id,
            },
            include: [
                {
                    model: SubTaskProgressTrackingFiles,
                    as: "files",
                    where: { status: 1 },
                    required: false,
                },
            ],
        });
    },

    /* ================= FIND BY SUB TASK ================= */
    findByField: async (field, value, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return SubTaskProgressTracking.findAll({
            where: {
                sub_task_id: value,
                status: 1,
                // client_id: user.client_id,
            },
            include: [
                {
                    model: SubTaskProgressTrackingFiles,
                    as: "files",
                    where: { status: 1 },
                    required: false,
                },
            ],
            order: [["progress_date", "ASC"]],
        });
    },

    /* ================= UPDATE ================= */
    update: async (id, data, user, files = []) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        return sequelize.transaction(async (t) => {
            const record = await SubTaskProgressTracking.findOne({
                where: {
                    id,
                    status: 1,
                    // client_id: user.client_id,
                },
                transaction: t,
            });

            if (!record) {
                throw new Error("Sub-task progress record not found");
            }

            await record.update(
                {
                    project_id: data.project_id ?? record.project_id,
                    sub_task_id: data.sub_task_id ?? record.sub_task_id,
                    progress_date: data.progress_date ?? record.progress_date,
                    progress_quantity:
                        data.progress_quantity ?? record.progress_quantity,
                    progress_percentage:
                        data.progress_percentage ?? record.progress_percentage,
                    remarks: data.remarks ?? record.remarks,
                    updated_by: user.id,
                },
                { transaction: t }
            );

            if (files.length > 0) {
                const filePayload = files.map((file) => ({
                    sub_task_progress_tracking_id: record.id,
                    file_name: file.originalname,
                     file_path: `uploads/progress/${file.filename}`, 
                    file_type: file.mimetype,
                    file_size: file.size,
                    uploaded_by: user.id,
                    status: 1,
                }));

                await SubTaskProgressTrackingFiles.bulkCreate(filePayload, {
                    transaction: t,
                });
            }

            return record;
        });
    },

    /* ================= SOFT DELETE ================= */
    remove: async (id, user) => {
        console.log("test");
        console.log(user);
        
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        return SubTaskProgressTracking.update(
            {
                status: 0,
                updated_by: user.id,
            },
            {
                where: {
                    id,
                    // client_id: user.client_id,
                },
            }
        );
    },
};
