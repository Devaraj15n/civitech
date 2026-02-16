const base = require("../base.service");
const path = require("path");

const {
    sequelize,
    progress_tracking: ProgressTracking,
    progress_tracking_files: ProgressTrackingFiles,
} = require("../../models");
const { progress_activity_timeline: Timeline } = require("../../models");
const { task_master: Task } = require("../../models");


const { Sequelize } = require("sequelize");



module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user, files = []) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        return sequelize.transaction(async (t) => {

            /* 1️⃣ Fetch task */
            const task = await Task.findOne({
                where: {
                    id: data.task_id,
                    status: 1,
                },
                transaction: t,
            });

            if (!task) {
                throw new Error("Task not found");
            }

            if (task.progress_percentage >= 100) {
                throw new Error(
                    "Task is already completed. You can only edit existing progress."
                );
            }

            /* 2️⃣ Sum existing progress quantity */
            const totalQuantityResult = await ProgressTracking.findOne({
                attributes: [
                    [Sequelize.fn("SUM", Sequelize.col("progress_quantity")), "total"],
                ],
                where: {
                    task_id: data.task_id,
                    status: 1,
                },
                transaction: t,
                raw: true,
            });

            const existingQuantity = Number(totalQuantityResult.total || 0);
            const newQuantity = Number(data.progress_quantity || 0);
            const totalQuantity = existingQuantity + newQuantity;

            /* 3️⃣ Calculate percentage */
            let progressPercentage =
                task.quantity > 0
                    ? (totalQuantity / task.quantity) * 100
                    : 0;

            if (progressPercentage > 100) {
                throw new Error(
                    `Progress exceeds task quantity. Max allowed quantity: ${task.quantity - existingQuantity
                    }`
                );
            }

            progressPercentage = Number(progressPercentage.toFixed(2));

            /* 4️⃣ Create progress record */
            const progress = await ProgressTracking.create(
                {
                    project_id: data.project_id,
                    task_id: data.task_id,
                    progress_date: data.progress_date,
                    progress_quantity: newQuantity,
                    progress_percentage: progressPercentage,
                    remarks: data.remarks ?? null,
                    location: data.location ?? null,
                    client_id: user.client_id,
                    status: 1,
                    created_by: user.id,
                    updated_by: user.id,
                },
                { transaction: t }
            );

            /* 5️⃣ Update task */
            await Task.update(
                {
                    progress_percentage: progressPercentage,
                    task_status: progressPercentage === 100 ? "Completed" : "Ongoing",
                    updated_by: user.id,
                },
                {
                    where: { id: task.id },
                    transaction: t,
                }
            );

            /* 6️⃣ Timeline */
            await Timeline.create(
                {
                    project_id: data.project_id,
                    task_id: data.task_id,
                    activity_type: "TASK_PROGRESS",
                    reference_id: progress.id,
                    created_by: user.id,
                },
                { transaction: t }
            );

            /* 7️⃣ Files (optional) */
            if (files.length > 0) {
                const filePayload = files.map((file) => ({
                    progress_tracking_id: progress.id,
                    file_name: file.originalname,
                    file_path: `uploads/progress/${file.filename}`,
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
                    // client_id: user.client_id,
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
                    file_path: `uploads/progress/${file.filename}`,
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
                    // client_id: user.client_id,
                },
            }
        );
    },
};
