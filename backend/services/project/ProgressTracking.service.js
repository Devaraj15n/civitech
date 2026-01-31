const base = require("../base.service");
const {
    sequelize,
    progress_tracking: ProgressTracking,
    progress_tracking_files: ProgressTrackingFiles,
} = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user, files = []) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        return sequelize.transaction(async (t) => {
            const progress = await ProgressTracking.create(
                {
                    project_id: data.project_id,
                    task_id: data.task_id,
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
                    progress_tracking_id: progress.id,
                    file_name: file.originalname,
                    file_path: file.path,
                    file_type: file.mimetype,
                    file_size: file.size,
                    uploaded_by: user.id,
                    status: 1,
                }));

                await ProgressTrackingFiles.bulkCreate(filePayload, {
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

        return ProgressTracking.findAll({
            where: {
                ...query,
                status: 1,
                // client_id: user.client_id,
            },
            include: [
                {
                    model: ProgressTrackingFiles,
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

        return ProgressTracking.findOne({
            where: {
                id,
                status: 1,
                // client_id: user.client_id,
            },
            include: [
                {
                    model: ProgressTrackingFiles,
                    as: "files",
                    where: { status: 1 },
                    required: false,
                },
            ],
        });
    },

    /* ================= FIND BY TASK ================= */
    findByField: async (field, value, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return ProgressTracking.findAll({
            where: {
                task_id: value,
                status: 1,
                // client_id: user.client_id,
            },
            include: [
                {
                    model: ProgressTrackingFiles,
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
            const record = await ProgressTracking.findOne({
                where: {
                    id,
                    status: 1,
                    client_id: user.client_id,
                },
                transaction: t,
            });

            if (!record) {
                throw new Error("Progress record not found");
            }

            await record.update(
                {
                    project_id: data.project_id ?? record.project_id,
                    task_id: data.task_id ?? record.task_id,
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
                    progress_tracking_id: record.id,
                    file_name: file.originalname,
                    file_path: file.path,
                    file_type: file.mimetype,
                    file_size: file.size,
                    uploaded_by: user.id,
                    status: 1,
                }));

                await ProgressTrackingFiles.bulkCreate(filePayload, {
                    transaction: t,
                });
            }

            return record;
        });
    },

    /* ================= SOFT DELETE ================= */
    remove: async (id, user) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        return ProgressTracking.update(
            {
                status: 0,
                updated_by: user.id,
            },
            {
                where: {
                    id,
                    client_id: user.client_id,
                },
            }
        );
    },
};
