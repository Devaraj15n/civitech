const base = require("../base.service");
const { retention_master: Retention } = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    create: async (data, user) => {
        const existing = await Retention.findOne({
            where: {
                client_id: user.client_id,
                item_name: data.item_name,
                status: 1,
            },
        });

        if (existing) {
            throw new Error(`Retention '${data.item_name}' already exists`);
        }

        return base.create(Retention)({
            client_id: user.client_id,
            item_name: data.item_name,
            percentage: data.percentage,
            duration_days: data.duration_days,
            status: data.status ?? 1,

            // ✅ audit
            created_by: user.client_id,
            updated_by: user.client_id,
        });
    },

    findAll: (_, user) => {
        return base.findAll(Retention)({
            client_id: user.client_id,
            status: 1,
        });
    },

    findById: base.findById(Retention),

    update: async (id, data, user) => {
        if (data.item_name) {
            const existing = await Retention.findOne({
                where: {
                    client_id: user.client_id,
                    item_name: data.item_name,
                    id: { [Sequelize.Op.ne]: id },
                    status: 1,
                },
            });

            if (existing) {
                throw new Error(`Retention '${data.item_name}' already exists`);
            }
        }

        return base.update(Retention)(id, {
            ...data,
            updated_by: user.client_id, // ✅ audit
        });
    },

    remove: base.remove(Retention),
};
