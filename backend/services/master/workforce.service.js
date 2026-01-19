const base = require("../base.service");
const { workforce_master: Workforce } = require("../../models");

module.exports = {
    create: async (data, user) => {
        return base.create(Workforce)({
            client_id: user.client_id,
            ...data,
        });
    },

    findAll: (_, user) => {
        return base.findAll(Workforce)({
            client_id: user.client_id,
            status: 1,
        });
    },

    findById: base.findById(Workforce),

    update: (id, data) => {
        return base.update(Workforce)(id, data);
    },

    remove: base.remove(Workforce),
};
