const base = require("../base.service");
const {
    attendance_master: Attendance,
} = require("../../models");
const { Op } = require("sequelize");

module.exports = {

    /* ================= CREATE ================= */
    create: async (data, user) => {

        if (!data.attendance_date) {
            throw new Error("Attendance date is required");
        }

        // Prevent duplicate attendance for same party + project + date
        const existing = await Attendance.findOne({
            where: {
                project_id: data.project_id,
                party_id: data.party_id,
                attendance_date: data.attendance_date,
                status: 1,
            },
        });

        if (existing) {
            throw new Error("Attendance already marked for this date");
        }

        return base.create(Attendance)({
            project_id: data.project_id,
            party_id: data.party_id,
            attendance_date: data.attendance_date,
            shift_count: data.shift_count ?? 1,
            overtime_hours: data.overtime_hours ?? 0,
            attendance_status: data.attendance_status ?? "Present",
            status: data.status ?? 1,
            created_by: user.id,
        });
    },

    /* ================= FIND ALL ================= */
    findAll: (filters = {}) => {

        const where = { status: 1 };

        if (filters.project_id) {
            where.project_id = filters.project_id;
        }

        if (filters.party_id) {
            where.party_id = filters.party_id;
        }

        if (filters.from_date && filters.to_date) {
            where.attendance_date = {
                [Op.between]: [filters.from_date, filters.to_date],
            };
        }

        return base.findAll(Attendance)(where, {
            include: [
                { association: "creator" },
                { association: "updater" },
                { association: "shifts" },
            ],
            order: [["attendance_date", "DESC"]],
        });
    },

    /* ================= FIND BY ID ================= */
    findById: base.findById(Attendance),

    /* ================= UPDATE ================= */
    update: async (id, data, user) => {

        const record = await Attendance.findByPk(id);
        if (!record) throw new Error("Attendance not found");

        // Duplicate check if changing date/project/party
        if (data.project_id || data.party_id || data.attendance_date) {

            const existing = await Attendance.findOne({
                where: {
                    project_id: data.project_id ?? record.project_id,
                    party_id: data.party_id ?? record.party_id,
                    attendance_date: data.attendance_date ?? record.attendance_date,
                    id: { [Op.ne]: id },
                    status: 1,
                },
            });

            if (existing) {
                throw new Error("Attendance already exists for this date");
            }
        }

        return base.update(Attendance)(id, {
            project_id: data.project_id ?? record.project_id,
            party_id: data.party_id ?? record.party_id,
            attendance_date: data.attendance_date ?? record.attendance_date,
            shift_count: data.shift_count ?? record.shift_count,
            overtime_hours: data.overtime_hours ?? record.overtime_hours,
            attendance_status: data.attendance_status ?? record.attendance_status,
            status: data.status ?? record.status,
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