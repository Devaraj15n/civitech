const base = require("../base.service");
const { project_master: Project } = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user) => {
        if (!user?.client_id || !user?.id) {
            throw new Error("User context is required");
        }

        const existing = await Project.findOne({
            where: {
                project_code: data.project_code,
                client_id: user.client_id,
                status: 1,
            },
        });

        if (existing) {
            throw new Error(`Project code '${data.project_code}' already exists`);
        }

        return base.create(Project)({
            project_code: data.project_code,
            project_name: data.project_name,
            client_id: user.client_id,
            start_date: data.start_date,
            end_date: data.end_date,
            project_value: data.project_value,
            project_address: data.project_address,
            orientation: data.orientation,
            dimension: data.dimension,
            attendance_radius: data.attendance_radius,
            project_status: data.project_status ?? "Planning",

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

        return base.findAll(Project)({
            ...query,
            client_id: user.client_id,
            status: 1,
        });
    },

    /* ================= FIND BY ID ================= */
    findById: async (id, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return Project.findOne({
            where: {
                id,
                client_id: user.client_id,
                status: 1,
            },
        });
    },

    /* ================= UPDATE ================= */
    update: async (id, data, user) => {
        if (!user?.client_id || !user?.id) {
            throw new Error("User context is required");
        }

        const record = await Project.findOne({
            where: {
                id,
                client_id: user.client_id,
                status: 1,
            },
        });

        if (!record) {
            throw new Error("Project not found");
        }

        // Duplicate check only if project_code changed
        if (data.project_code && data.project_code !== record.project_code) {
            const existing = await Project.findOne({
                where: {
                    project_code: data.project_code,
                    client_id: user.client_id,
                    status: 1,
                },
            });

            if (existing) {
                throw new Error(`Project code '${data.project_code}' already exists`);
            }
        }

        return base.update(Project)(id, {
            project_code: data.project_code ?? record.project_code,
            project_name: data.project_name ?? record.project_name,
            start_date: data.start_date ?? record.start_date,
            end_date: data.end_date ?? record.end_date,
            project_value: data.project_value ?? record.project_value,
            project_address: data.project_address ?? record.project_address,
            orientation: data.orientation ?? record.orientation,
            dimension: data.dimension ?? record.dimension,
            attendance_radius: data.attendance_radius ?? record.attendance_radius,
            project_status: data.project_status ?? record.project_status,

            updated_by: user.id,
        });
    },

    /* ================= SOFT DELETE ================= */
    remove: base.remove(Project),
};
