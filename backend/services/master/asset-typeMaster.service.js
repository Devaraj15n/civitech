const base = require("../base.service");
const { asset_type_master: AssetType } = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    create: async (data, user) => {
        const existing = await AssetType.findOne({
            where: {
                client_id: user.client_id,
                asset_type_name: data.asset_type_name,
                status: 1,
            },
        });

        if (existing) {
            throw new Error(`Asset Type '${data.asset_type_name}' already exists`);
        }

        return base.create(AssetType)({
            client_id: user.client_id,

            asset_type_name: data.asset_type_name,
            unit: data.unit,
            cost_price: data.cost_price,
            status: data.status ?? 1,

            // ✅ audit
            created_by: user.client_id,
            updated_by: user.client_id,
        });
    },

    findAll: (_, user) => {
        return base.findAll(AssetType)({
            client_id: user.client_id,
            status: 1,
        });
    },

    findById: base.findById(AssetType),

    update: async (id, data, user) => {
        if (data.asset_type_name) {
            const existing = await AssetType.findOne({
                where: {
                    client_id: user.client_id,
                    asset_type_name: data.asset_type_name,
                    id: { [Sequelize.Op.ne]: id },
                    status: 1,
                },
            });

            if (existing) {
                throw new Error(`Asset Type '${data.asset_type_name}' already exists`);
            }
        }

        return base.update(AssetType)(id, {
            ...data,
            updated_by: user.client_id, // ✅ audit
        });
    },

    remove: base.remove(AssetType),
};
