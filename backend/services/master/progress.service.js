const base = require("../base.service");
const { progress_master: Progress } = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    create: async (data, user) => {
        const existing = await Progress.findOne({
            where: {
                client_id: user.client_id,
                name: data.name,
                status: 1,
            },
        });

        if (existing) {
            throw new Error(`Progress '${data.name}' already exists`);
        }

        return base.create(Progress)({
            client_id: user.client_id,
            ...data,
        });
    },

    findAll: (_, user) => {
        return base.findAll(Progress)({
            client_id: user.client_id,
        });
    },

    findById: base.findById(Progress),

    update: async (id, data, user) => {
        const existing = await Progress.findOne({
            where: {
                client_id: user.client_id,
                name: data.name,
                id: { [Sequelize.Op.ne]: id },
            },
        });

        if (existing) {
            throw new Error(`Progress '${data.name}' already exists`);
        }

        return base.update(Progress)(id, data);
    },

    remove: base.remove(Progress),
};
