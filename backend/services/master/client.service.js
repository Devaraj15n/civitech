const base = require('../base.service');
const { client_master: Client, user_master: User, party_type_master: PartyType, party_master: Party, sequelize } = require('../../models');
const bcrypt = require('bcryptjs');

module.exports = {
  create: async (data) => {
    const t = await sequelize.transaction(); // start transaction

    try {
      // 1️⃣ Create client
      const client = await Client.create(data, { transaction: t });

      // 2️⃣ Create default CLIENT_ADMIN user
      const defaultPassword = '123456';
      const password_hash = await bcrypt.hash(defaultPassword, 10);

      await User.create({
        client_id: client.id,
        username: `admin_${client.client_code}`, // unique username
        email: data.email,                       // can use client email
        phone: data.phone,                       
        password_hash,
        user_type: 'CLIENT_ADMIN',
        status: 1
      }, { transaction: t });

      // 3️⃣ Create default party types (you can adjust names)
      const defaultPartyTypes = ['Vendor', 'Client', 'Staff'];
      const partyTypeRecords = [];

      for (let type of defaultPartyTypes) {
        const pt = await PartyType.create({
          party_type: type,
          client_id: client.id,
          status: 1
        }, { transaction: t });
        partyTypeRecords.push(pt);
      }

      // 4️⃣ Create a default party for each type (optional)
      const defaultParty = await Party.create({
        client_id: client.id,
        party_name: `${client.client_name} Default Party`,
        party_type_id: partyTypeRecords[1].id, // example: 'Client' type
        email: data.email,
        phone: data.phone,
        address: data.address || '',
        status: 1
      }, { transaction: t });

      // 5️⃣ Commit transaction
      await t.commit();

      return client;

    } catch (err) {
      // Rollback if anything fails
      await t.rollback();
      throw err;
    }
  },

  findAll: base.findAll(Client),
  findById: base.findById(Client),
  update: base.update(Client),
  remove: base.remove(Client)
};
