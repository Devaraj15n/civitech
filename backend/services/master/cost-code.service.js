const base = require("../base.service");
const { cost_code_master: CostCode } = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
    /* ================= CREATE ================= */
    create: async (data, user) => {
        const existing = await CostCode.findOne({
            where: {
                client_id: user.client_id,
                cost_code: data.cost_code,
                status: 1,
            },
        });

        if (existing) {
            throw new Error(`Cost code '${data.cost_code}' already exists`);
        }

        return base.create(CostCode)({
            client_id: user.client_id,
            cost_code: data.cost_code,
            name: data.name,
            parent_cost_code_id: data.parent_cost_code_id ?? null,
            cost_component: data.cost_component,
            description: data.description ?? null,
        });
    },

    /* ================= FIND ALL ================= */
    findAll: (_, user) => {
        return base.findAll(CostCode)({
            client_id: user.client_id,
            status: 1,
        });
    },

    /* ================= FIND BY ID ================= */
    findById: (id, user) => {
        return CostCode.findOne({
            where: {
                id,
                client_id: user.client_id,
                status: 1,
            },
        });
    },


    /* ================= UPDATE ================= */
    update: async (id, data, user) => {

        const record = await CostCode.findOne({
            where: {
                id,
                client_id: user.client_id,
            },
        });

        if (!record) {
            throw new Error("Cost code not found");
        }

        // Duplicate check only if cost_code changed
        if (data.cost_code && data.cost_code !== record.cost_code) {
            const existing = await CostCode.findOne({
                where: {
                    client_id: user.client_id,
                    cost_code: data.cost_code,
                    status: 1,
                },
            });

            if (existing) {
                throw new Error(`Cost code '${data.cost_code}' already exists`);
            }
        }

        return base.update(CostCode)(id, {
            cost_code: data.cost_code ?? record.cost_code,
            name: data.name ?? record.name,
            parent_cost_code_id:
                data.parent_cost_code_id ?? record.parent_cost_code_id,
            cost_component: data.cost_component ?? record.cost_component,
            description: data.description ?? record.description,
            status: data.status ?? record.status,
        });
    },


    /* ================= SOFT DELETE ================= */
    remove: base.remove(CostCode),
};
