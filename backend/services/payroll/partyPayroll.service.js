const {
    party_payroll_details: PartyPayroll,
    party_master: Party,
    cost_code_master: CostCode,
} = require("../../models");

module.exports = {

    /* ================= CREATE ================= */
    create: async (data, user) => {

        // Prevent duplicate payroll for same party
        const existing = await PartyPayroll.findOne({
            where: {
                party_id: data.party_id,
                status: 1,
            },
        });

        if (existing) {
            throw new Error("Payroll already exists for this party");
        }

        return PartyPayroll.create({
            party_id: data.party_id,
            salary_amount: data.salary_amount,
            salary_type: data.salary_type || "Monthly",
            shift_hours: data.shift_hours,
            overtime_rate: data.overtime_rate,
            cost_code_id: data.cost_code_id || null,
            status: 1,
            created_by: user.id,
        });
    },

    /* ================= FIND ALL ================= */
    findAll: async () => {
        return PartyPayroll.findAll({
            where: { status: 1 },
            include: [
                {
                    model: Party,
                    attributes: ["id", "party_name"],
                },
                {
                    model: CostCode,
                    attributes: ["id", "cost_code_name"],
                },
            ],
            order: [["created_at", "DESC"]],
        });
    },

    /* ================= FIND BY ID ================= */
    findById: async (id) => {
        const data = await PartyPayroll.findByPk(id, {
            include: [
                {
                    model: Party,
                    attributes: ["id", "party_name"],
                },
                {
                    model: CostCode,
                    attributes: ["id", "cost_code_name"],
                },
            ],
        });

        if (!data) throw new Error("Payroll not found");

        return data;
    },

    /* ================= UPDATE ================= */
    update: async (id, data, user) => {

        const record = await PartyPayroll.findByPk(id);
        if (!record) throw new Error("Payroll not found");

        return record.update({
            salary_amount: data.salary_amount ?? record.salary_amount,
            salary_type: data.salary_type ?? record.salary_type,
            shift_hours: data.shift_hours ?? record.shift_hours,
            overtime_rate: data.overtime_rate ?? record.overtime_rate,
            cost_code_id: data.cost_code_id ?? record.cost_code_id,
            updated_by: user.id,
        });
    },

    /* ================= SOFT DELETE ================= */
    remove: async (id, user) => {

        const record = await PartyPayroll.findByPk(id);
        if (!record) throw new Error("Payroll not found");

        return record.update({
            status: 0,
            updated_by: user.id,
        });
    },
};