const base = require("../base.service");
const { workforce_master: Workforce } = require("../../models");

module.exports = {
    create: async (data, user) => {
        return base.create(Workforce)({
            client_id: user.client_id,

            name: data.name,
            worker_type_id: data.worker_type_id,
            date_of_joining: data.date_of_joining,
            aadhaar: data.aadhaar,
            pan: data.pan,
            contractor_party_id: data.contractor_party_id,
            status: data.status ?? 1,

            // ✅ audit
            created_by: user.client_id,
            updated_by: user.client_id,
        });
    },

    findAll: (_, user) => {
        return base.findAll(Workforce)({
            client_id: user.client_id,
            status: 1,
        });
    },

    findById: base.findById(Workforce),

    update: (id, data, user) => {
        return base.update(Workforce)(id, {
            ...data,
            updated_by: user.client_id, // ✅ audit
        });
    },

    remove: base.remove(Workforce),
};
