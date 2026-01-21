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
            ...data,
        });
    },

    findAll: (_, user) => {
        return base.findAll(Deduction)({
            client_id: user.client_id,
        });
    },

    findById: base.findById(Deduction),

    update: async (id, data, user) => {
        const existing = await Deduction.findOne({
            where: {
                client_id: user.client_id,
                item_name: data.item_name,
                id: { [Sequelize.Op.ne]: id },
            },
        });

        if (existing) {
            throw new Error(`Deduction '${data.item_name}' already exists`);
        }

        return base.update(Deduction)(id, data);
    },

    remove: base.remove(Deduction),
};
