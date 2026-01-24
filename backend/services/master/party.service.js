const base = require("../base.service");
const {
  party_master: Party,
  party_type_master: PartyType,
} = require("../../models");

module.exports = {
  create: (data, user) => {
    return base.create(Party)({
      ...data,
      client_id: user.client_id,
    });
  },

  findAll: (_, user) => {
    return base.findAll(Party)(
      { client_id: user.client_id }, // ✅ correct
      {
        include: [
          {
            model: PartyType,
            as: "partyType",
          },
        ],
      }
    );
  },

  findById: (id, user) => {
    return base.findById(Party)(id, {
      where: { client_id: user.client_id },
      include: [
        {
          model: PartyType,
          as: "partyType",
        },
      ],
    });
  },

  update: (id, data, user) => {
    return base.update(Party)(id, data, {
      where: { client_id: user.client_id },
    });
  },

  remove: (id, user) => {
    return base.remove(Party)(id, {
      where: { client_id: user.client_id },
    });
  },
};
