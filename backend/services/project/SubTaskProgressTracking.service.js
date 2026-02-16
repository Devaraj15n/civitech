const {
    sequelize,
    sub_task_progress_tracking: SubTaskProgressTracking,
    sub_task_progress_tracking_files: SubTaskProgressTrackingFiles,
    sub_task: SubTask,
    sub_task_activity_timeline: Timeline,
} = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user, files = []) => {
        if (!user?.id || !user?.client_id) throw new Error("User context is required");

        return sequelize.transaction(async (t) => {
            const subTask = await SubTask.findOne({ where: { id: data.sub_task_id, status: 1 }, transaction: t });
            if (!subTask) throw new Error("Sub-task not found");
            if (!subTask.quantity || subTask.quantity <= 0) throw new Error("Sub-task quantity is not defined");
            if (subTask.progress_percentage >= 100) throw new Error("Sub-task is already completed");

            const totalQuantityResult = await SubTaskProgressTracking.findOne({
                attributes: [[Sequelize.fn("SUM", Sequelize.col("progress_quantity")), "total"]],
                where: { sub_task_id: data.sub_task_id, status: 1 },
                transaction: t,
                raw: true,
            });
            const existingQuantity = Number(totalQuantityResult.total || 0);
            const newQuantity = Number(data.progress_quantity || 0);
            if (newQuantity <= 0) throw new Error("Progress quantity must be greater than zero");

            const totalQuantity = existingQuantity + newQuantity;
            let progressPercentage = (totalQuantity / subTask.quantity) * 100;
            if (progressPercentage > 100) throw new Error(`Progress exceeds sub-task quantity. Remaining: ${subTask.quantity - existingQuantity} ${subTask.unit ?? ""}`);
            progressPercentage = Number(progressPercentage.toFixed(2));

            // 1️⃣ Create progress
            const progress = await SubTaskProgressTracking.create({
                project_id: data.project_id,
                sub_task_id: data.sub_task_id,
                progress_date: data.progress_date,
                progress_quantity: newQuantity,
                progress_percentage: progressPercentage,
                remarks: data.remarks ?? null,
                location: data.location ?? null,
                client_id: user.client_id,
                status: 1,
                created_by: user.id,
                updated_by: user.id,
            }, { transaction: t });

            // 2️⃣ Update sub-task percentage
            await SubTask.update({ progress_percentage: progressPercentage, updated_by: user.id }, { where: { id: subTask.id }, transaction: t });

            // 3️⃣ Timeline entry for progress
            await Timeline.create({
                project_id: data.project_id,
                sub_task_id: data.sub_task_id,
                task_id: subTask.task_id,
                activity_type: "SUB_TASK_PROGRESS",
                reference_id: progress.id,
                created_by: user.id,
            }, { transaction: t });

            // 4️⃣ Attach files & timeline entries for each
            for (let file of files) {
                const fileRecord = await SubTaskProgressTrackingFiles.create({
                    sub_task_progress_tracking_id: progress.id,
                    file_name: file.originalname,
                    file_path: `uploads/progress/${file.filename}`,
                    file_type: file.mimetype,
                    file_size: file.size,
                    uploaded_by: user.id,
                    status: 1,
                }, { transaction: t });

                await Timeline.create({
                    project_id: data.project_id,
                    sub_task_id: data.sub_task_id,
                    activity_type: "SUB_TASK_PROGRESS_FILE",
                    reference_id: fileRecord.id,
                    created_by: user.id,
                }, { transaction: t });
            }

            return progress;
        });
    },

    findAll: (query, user) => {
        if (!user?.client_id) throw new Error("Client ID is required");
        return SubTaskProgressTracking.findAll({
            where: { ...query, status: 1 },
            include: [{ model: SubTaskProgressTrackingFiles, as: "files", required: false }],
            order: [["progress_date", "ASC"]],
        });
    },

    findById: (id, user) => {
        if (!user?.client_id) throw new Error("Client ID is required");
        return SubTaskProgressTracking.findOne({
            where: { id, status: 1 },
            include: [{ model: SubTaskProgressTrackingFiles, as: "files", required: false }],
        });
    },

    update: async (id, data, user, files = []) => {
        if (!user?.id || !user?.client_id) throw new Error("User context is required");

        return sequelize.transaction(async (t) => {
            const record = await SubTaskProgressTracking.findOne({ where: { id, status: 1 }, transaction: t });
            if (!record) throw new Error("Sub-task progress record not found");
            if (data.progress_quantity && data.progress_quantity !== record.progress_quantity) {
                throw new Error("Editing progress quantity is not allowed. Delete and re-add entry.");
            }

            await record.update({ progress_date: data.progress_date ?? record.progress_date, remarks: data.remarks ?? record.remarks, updated_by: user.id }, { transaction: t });

            // Attach new files & timeline entries
            for (let file of files) {
                const fileRecord = await SubTaskProgressTrackingFiles.create({
                    sub_task_progress_tracking_id: record.id,
                    file_name: file.originalname,
                    file_path: `uploads/progress/${file.filename}`,
                    file_type: file.mimetype,
                    file_size: file.size,
                    uploaded_by: user.id,
                    status: 1,
                }, { transaction: t });

                await Timeline.create({
                    project_id: record.project_id,
                    sub_task_id: record.sub_task_id,
                    activity_type: "SUB_TASK_PROGRESS_FILE",
                    reference_id: fileRecord.id,
                    created_by: user.id,
                }, { transaction: t });
            }

            return record;
        });
    },

    remove: async (id, user) => {
        if (!user?.id || !user?.client_id) throw new Error("User context is required");

        return sequelize.transaction(async (t) => {
            const record = await SubTaskProgressTracking.findOne({ where: { id, status: 1 }, transaction: t });
            if (!record) throw new Error("Progress record not found");

            await record.update({ status: 0, updated_by: user.id }, { transaction: t });

            const totalQuantityResult = await SubTaskProgressTracking.findOne({
                attributes: [[Sequelize.fn("SUM", Sequelize.col("progress_quantity")), "total"]],
                where: { sub_task_id: record.sub_task_id, status: 1 },
                transaction: t,
                raw: true,
            });

            const newTotal = Number(totalQuantityResult.total || 0);
            const subTask = await SubTask.findByPk(record.sub_task_id, { transaction: t });
            const newPercentage = subTask.quantity ? Number(((newTotal / subTask.quantity) * 100).toFixed(2)) : 0;

            await SubTask.update({ progress_percentage: newPercentage, updated_by: user.id }, { where: { id: subTask.id }, transaction: t });

            return true;
        });
    },
};
