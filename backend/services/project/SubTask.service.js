const base = require("../base.service");
const { sub_task: SubTask } = require("../../models");
const { task_master: Task } = require("../../models");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        // Optional: validate task belongs to client
        const task = await Task.findOne({
            where: {
                id: data.task_id,
                // client_id: user.client_id,
                status: 1,
            },
        });

        if (!task) {
            throw new Error("Invalid task or you don't have permission");
        }

        return base.create(SubTask)({
            task_id: data.task_id,
            sub_task_name: data.sub_task_name,
            start_date: data.start_date,
            end_date: data.end_date,
            duration_days: data.duration_days,
            progress_percentage: data.progress_percentage ?? 0.0,
            notes: data.notes ?? null,

            status: 1,               // 🔹 active
            created_by: user.id,
            updated_by: user.id,
        });
    },

    /* ================= FIND ALL ================= */
    findAll: (query, user) => {
        // if (!user?.client_id) {
        //     throw new Error("Client ID is required");
        // }

        return base.findAll(SubTask)({
            ...query,
            status: 1,               // 🔹 active only
        });
    },

    /* ================= FIND BY ID ================= */
    findById: async (id, user) => {
        // if (!user?.client_id) {
        //     throw new Error("Client ID is required");
        // }

        return SubTask.findOne({
            where: {
                id,
                status: 1,
            },
            include: [
                {
                    model: Task,
                    where: {
                        // client_id: user.client_id,
                        status: 1,
                    },
                },
            ],
        });
    },

    /* ================= UPDATE ================= */
    update: async (id, data, user) => {
        if (!user?.id || !user?.client_id) {
            throw new Error("User context is required");
        }

        const record = await SubTask.findOne({
            where: {
                id,
                status: 1,
            },
        });

        if (!record) {
            throw new Error("Subtask not found");
        }

        return base.update(SubTask)(id, {
            sub_task_name: data.sub_task_name ?? record.sub_task_name,
            start_date: data.start_date ?? record.start_date,
            end_date: data.end_date ?? record.end_date,
            duration_days: data.duration_days ?? record.duration_days,
            progress_percentage: data.progress_percentage ?? record.progress_percentage,
            notes: data.notes ?? record.notes,

            updated_by: user.id,
        });
    },

    /* ================= SOFT DELETE ================= */
    remove: base.remove(SubTask),
};
