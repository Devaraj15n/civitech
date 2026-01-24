const base = require("../base.service");
const { rate_master: Rate } = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    create: async (data, user) => {
        const existing = await Rate.findOne({
            where: {
                client_id: user.client_id,
                item_code: data.item_code,
                status: 1,
            },
        });

        if (existing) {
            throw new Error(`Rate item '${data.item_code}' already exists`);
        }

        return base.create(Rate)({
            client_id: user.client_id,
            item_name: data.item_name,
            item_code: data.item_code,
            unit: data.unit,
            gst_percentage: data.gst_percentage ?? 0,
            cost_component: data.cost_component,
            unit_cost_price: data.unit_cost_price,
            markup_percentage: data.markup_percentage ?? 0,
            additional_fees: data.additional_fees ?? 0,
            unit_sale_price: data.unit_sale_price,
            status: data.status ?? 1,

            // ✅ audit
            created_by: user.client_id,
            updated_by: user.client_id,
        });
    },

    findAll: (query, user) => {
        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        return base.findAll(Rate)({
            ...query,
            client_id: user.client_id,
            status: 1,
        });
    },

    findById: base.findById(Rate),

    update: async (id, data, user) => {
        if (!data) {
            throw new Error("Update data is required");
        }

        if (!user?.client_id) {
            throw new Error("Client ID is required");
        }

        if (data.item_code) {
            const existing = await Rate.findOne({
                where: {
                    client_id: user.client_id,
                    item_code: data.item_code,
                    id: { [Sequelize.Op.ne]: id },
                    status: 1,
                },
            });

            if (existing) {
                throw new Error(`Rate item '${data.item_code}' already exists`);
            }
        }

        return base.update(Rate)(id, {
            ...data,
            updated_by: user.client_id, // ✅ audit update
        });
    },

    remove: base.remove(Rate),
};
