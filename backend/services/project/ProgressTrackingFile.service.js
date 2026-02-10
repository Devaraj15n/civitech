const { sequelize, progress_tracking_files: ProgressTrackingFiles } = require("../../models");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user, files = []) => {
        if (!user?.id) throw new Error("User context required");
        if (!files.length) throw new Error("No files provided");

        const payload = files.map(file => ({
            progress_tracking_id: data.progress_tracking_id,
            file_name: file.originalname,
            file_path: `uploads/progress/${file.filename}`,
            file_type: file.mimetype,
            file_size: file.size,
            uploaded_by: user.id,
            status: 1,
        }));

        return ProgressTrackingFiles.bulkCreate(payload);
    },

    /* ================= FIND ALL ================= */
    findAll: async (query) => {
        return ProgressTrackingFiles.findAll({
            where: { ...query, status: 1 },
            order: [["created_at", "DESC"]],
        });
    },

    /* ================= FIND BY ID ================= */
    findById: async (id) => {
        return ProgressTrackingFiles.findOne({
            where: { id, status: 1 },
        });
    },

    /* ================= FIND BY TASK ID ================= */
    findByTaskId: async (progress_tracking_id) => {
        return ProgressTrackingFiles.findAll({
            where: { progress_tracking_id, status: 1 },
            order: [["created_at", "ASC"]],
        });
    },

    /* ================= UPDATE ================= */
    update: async (id, data, user) => {
        const record = await ProgressTrackingFiles.findOne({
            where: { id, status: 1 },
        });

        if (!record) throw new Error("File not found");

        return record.update(
            {
                file_name: data.file_name ?? record.file_name,
                status: data.status ?? record.status,
            }
        );
    },

    /* ================= SOFT DELETE ================= */
    remove: async (id, user) => {
        return ProgressTrackingFiles.update(
            { status: 0 },
            { where: { id } }
        );
    },
};
