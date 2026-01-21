const base = require("../base.service");
const { rate_master: Rate } = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    create: async (data, user) => {
        const existing = await Rate.findOne({
            where: {
                client_id: user.client_id,
                item_code: data.item_code,
            },
        });

        if (existing) {
            throw new Error(`Rate item '${data.item_code}' already exists`);
        }

        return base.create(Rate)({
            client_id: user.client_id,
            ...data,
        });
    },

    findAll: (query, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        const where = {
            ...query,
            client_id: user.client_id,
        };

        return base.findAll(Rate)(where);
    },


    findById: base.findById(Rate),

    update: async (id, data, user) => {
        if (!data) {
            throw new Error("Update data is required");
        }

        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        // Only check duplicate if item_code is being updated
        if (data.item_code) {
            const existing = await Rate.findOne({
                where: {
                    client_id: user.client_id,
                    item_code: data.item_code,
                    id: { [Sequelize.Op.ne]: id },
                },
            });

            if (existing) {
                throw new Error(`Rate item '${data.item_code}' already exists`);
            }
        }

        return base.update(Rate)(id, data);
    },


    remove: base.remove(Rate),
};
