const base = require("../base.service");
const {
    attendance_master: Attendance,
} = require("../../models");
const { Op } = require("sequelize");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user) => {
        /**
         * Prevent duplicate attendance
         * Same project + party on same day
         */
        const existing = await Attendance.findOne({
            where: {
                project_id: data.project_id,
                party_id: data.party_id,
                created_at: {
                    [Op.between]: [
                        new Date().setHours(0, 0, 0, 0),
                        new Date().setHours(23, 59, 59, 999),
                    ],
                },
                status: 1,
            },
        });

        if (existing) {
            throw new Error("Attendance already marked for today");
        }

        return base.create(Attendance)({
            project_id: data.project_id,
            party_id: data.party_id,
            is_present: data.is_present ?? 0,
            attendance_status: data.attendance_status ?? null,
            status: data.status ?? 1,
            created_by: user.id,
        });
    },

    /* ================= FIND ALL ================= */
    findAll: (filters = {}, user) => {
        const where = {
            status: 1,
        };

        if (filters.project_id) {
            where.project_id = filters.project_id;
        }

        if (filters.party_id) {
            where.party_id = filters.party_id;
        }

        if (filters.from_date && filters.to_date) {
            where.created_at = {
                [Op.between]: [
                    new Date(filters.from_date),
                    new Date(filters.to_date),
                ],
            };
        }

        return base.findAll(Attendance)(where);
    },

    /* ================= FIND BY ID ================= */
    findById: base.findById(Attendance),

    /* ================= UPDATE ================= */
    update: async (id, data, user) => {
        /**
         * Optional duplicate check on update
         */
        if (data.project_id && data.party_id) {
            const existing = await Attendance.findOne({
                where: {
                    project_id: data.project_id,
                    party_id: data.party_id,
                    id: { [Op.ne]: id },
                    status: 1,
                },
            });

            if (existing) {
                throw new Error("Attendance already exists for this party and project");
            }
        }

        return base.update(Attendance)(id, {
            is_present: data.is_present,
            attendance_status: data.attendance_status,
            status: data.status,
            updated_by: user.id,
        });
    },

    /* ================= SOFT DELETE ================= */
    remove: async (id, user) => {
        return base.update(Attendance)(id, {
            status: 0,
            updated_by: user.id,
        });
    },
};