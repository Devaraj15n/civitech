const base = require("../base.service");
const { deduction_master: Deduction } = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    create: async (data, user) => {
        const existing = await Deduction.findOne({
            where: {
                client_id: user.client_id,
                item_name: data.item_name,
                status: 1, 
            },
        });

        if (existing) {
            throw new Error(`Deduction '${data.item_name}' already exists`);
        }

        return base.create(Deduction)({
            client_id: user.client_id,
            item_name: data.item_name,
            percentage: data.percentage,
            description: data.description ?? null,
            status: data.status ?? 1,

            // ✅ audit fields
            created_by: user.client_id,
            updated_by: user.client_id,
        });
    },

    findAll: (_, user) => {
        return base.findAll(Deduction)({
            client_id: user.client_id,
            status: 1,
        });
    },

    findById: base.findById(Deduction),

    update: async (id, data, user) => {
        // Duplicate check only if item_name is changing
        if (data.item_name) {
            const existing = await Deduction.findOne({
                where: {
                    client_id: user.client_id,
                    item_name: data.item_name,
                    id: { [Sequelize.Op.ne]: id },
                    status: 1,
                },
            });

            if (existing) {
                throw new Error(`Deduction '${data.item_name}' already exists`);
            }
        }

        return base.update(Deduction)(id, {
            ...data,
            updated_by: user.client_id, // ✅ always update audit field
        });
    },

    remove: base.remove(Deduction),
};
