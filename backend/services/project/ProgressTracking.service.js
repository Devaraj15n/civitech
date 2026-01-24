const base = require("../base.service");
const { progress_tracking: ProgressTracking } = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        // Optional: validate project/task belongs to client (recommended)
        // const project = await Project.findOne({ where: { id: data.project_id, client_id: user.client_id }});
        // if (!project) throw new Error("Invalid project for this client");

        return base.create(ProgressTracking)({
            project_id: data.project_id,
            task_id: data.task_id,
            progress_date: data.progress_date,
            progress_quantity: data.progress_quantity,
            progress_percentage: data.progress_percentage ?? 0.0,
            remarks: data.remarks ?? null,

            status: 1,
            created_by: user.id,
            updated_by: user.id,
        });
    },

    /* ================= FIND ALL ================= */
    findAll: (query, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return base.findAll(ProgressTracking)({
            ...query,
            status: 1,
            // client_id: user.client_id, // optional if you have client_id in progress_tracking
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
                // client_id: user.client_id, // optional if you have client_id in progress_tracking
            },
        });
    },

    /* ================= UPDATE ================= */
    update: async (id, data, user) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        const record = await ProgressTracking.findOne({
            where: {
                id,
                status: 1,
                client_id: user.client_id, // optional if you have client_id in progress_tracking
            },
        });

        if (!record) {
            throw new Error("Progress record not found");
        }

        return base.update(ProgressTracking)(id, {
            project_id: data.project_id ?? record.project_id,
            task_id: data.task_id ?? record.task_id,
            progress_date: data.progress_date ?? record.progress_date,
            progress_quantity: data.progress_quantity ?? record.progress_quantity,
            progress_percentage: data.progress_percentage ?? record.progress_percentage,
            remarks: data.remarks ?? record.remarks,

            updated_by: user.id,
        });
    },

    /* ================= SOFT DELETE ================= */
    remove: base.remove(ProgressTracking),
};
