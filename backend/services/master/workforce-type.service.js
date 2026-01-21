const base = require("../base.service");
const { workforce_type_master: WorkforceType } = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    create: async (data, user) => {
        const existing = await WorkforceType.findOne({
            where: {
                client_id: user.client_id,
                worker_type: data.worker_type,
                status: 1,
            },
        });

        if (existing) {
            throw new Error(`Worker type '${data.worker_type}' already exists`);
        }

        return base.create(WorkforceType)({
            client_id: user.client_id,
            ...data,
        });
    },

    findAll: (_, user) => {
        return base.findAll(WorkforceType)({
            client_id: user.client_id,
            status: 1,
        });
    },

    findById: base.findById(WorkforceType),

    update: async (id, data, user) => {
        const existing = await WorkforceType.findOne({
            where: {
                client_id: user.client_id,
                worker_type: data.worker_type,
                id: { [Sequelize.Op.ne]: id },
            },
        });

        if (existing) {
            throw new Error(`Worker type '${data.worker_type}' already exists`);
        }

        return base.update(WorkforceType)(id, data);
    },

    remove: base.remove(WorkforceType),
};
