const base = require("../base.service");
const { task_master: Task } = require("../../models");
const { project_master: Project } = require("../../models");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user) => {
        if (!user?.client_id || !user?.id) {
            throw new Error("User context is required");
        }

        // Validate project belongs to client
        const project = await Project.findOne({
            where: {
                id: data.project_id,
                client_id: user.client_id,
                status: 1,
            },
        });

        if (!project) {
            throw new Error("Invalid project or you don't have permission");
        }

        return base.create(Task)({
            project_id: data.project_id,
            task_name: data.task_name,
            start_date: data.start_date,
            end_date: data.end_date,
            duration_days: data.duration_days,
            assigned_to: data.assigned_to,
            task_status: data.task_status ?? "Pending",

            status: 1,
            created_by: user.id,
            updated_by: user.id,
        });
    },

    /* ================= FIND ALL ================= */
    findAll: (query, user) => {
        // if (!user?.client_id) {
        //     throw new Error("Client ID is required");
        // }

        return base.findAll(Task)({
            ...query,
            status: 1,
            // client_id: user.client_id,
        });
    },

    /* ================= FIND BY ID ================= */
    findById: (id, user) => {
        // if (!user?.client_id) {
        //     throw new Error("Client ID is required");
        // }

        return Task.findOne({
            where: {
                id,
                // client_id: user.client_id,
                status: 1,
            },
        });
    },

    /* ================= UPDATE ================= */
    update: async (id, data, user) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        const record = await Task.findOne({
            where: {
                id,
                client_id: user.client_id,
                status: 1,
            },
        });

        if (!record) {
            throw new Error("Task not found");
        }

        return base.update(Task)(id, {
            project_id: data.project_id ?? record.project_id,
            task_name: data.task_name ?? record.task_name,
            start_date: data.start_date ?? record.start_date,
            end_date: data.end_date ?? record.end_date,
            duration_days: data.duration_days ?? record.duration_days,
            assigned_to: data.assigned_to ?? record.assigned_to,
            task_status: data.task_status ?? record.task_status,
            status: data.status ?? record.status,

            updated_by: user.id,
        });
    },

    /* ================= SOFT DELETE ================= */
    remove: base.remove(Task),
};
