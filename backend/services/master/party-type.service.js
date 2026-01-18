const base = require("../base.service");
const { party_type_master: PartyType } = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
  create: async (data, user) => {
    console.log("user=>>>", user);

    // 1️⃣ Check if the party type already exists for this client
    const existing = await PartyType.findOne({
      where: {
        client_id: user.client_id,
        party_type: data.party_type,
      },
    });

    if (existing) {
      // Return existing record instead of failing
      throw new Error(`Party type '${data.party_type}' already exists`);

      // return existing;
    }

    // 2️⃣ If not exists, create new
    return base.create(PartyType)({
      ...data,
      client_id: user.client_id,
    });
  },

  findAll: (_, user) => {

    console.log("user.client_id");
    console.log(user.client_id);
    return base.findAll(PartyType)({
      client_id: user.client_id,
      status: 1,
    });
  },

  findById: base.findById(PartyType),

  update: async (id, data, user) => {
    // Ensure unique constraint on update
    const existing = await PartyType.findOne({
      where: {
        client_id: user.client_id,
        party_type: data.party_type,
        id: { [Sequelize.Op.ne]: id }, // ignore current record
      },
    });

    if (existing) {
      throw new Error(`Party type '${data.party_type}' already exists`);
    }

    return base.update(PartyType)(id, data);
  },

  remove: base.remove(PartyType),
};
