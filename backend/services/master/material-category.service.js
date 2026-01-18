const base = require("../base.service");
const { material_category_master: MaterialCategory } = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
  /* ================= CREATE ================= */
  create: async (data, user) => {

    // Optional: prevent duplicates per client
    const existing = await MaterialCategory.findOne({
      where: {
        client_id: user.client_id,
        category_name: data.category_name,
      },
    });

    if (existing) {
      throw new Error(
        `Material category '${data.category_name}' already exists`
      );
    }

    return base.create(MaterialCategory)({
      client_id: user.client_id,
      category_name: data.category_name,
      description: data.description ?? null,
    });
  },

  /* ================= FIND ALL ================= */
  findAll: (_, user) => {
    return base.findAll(MaterialCategory)({
      client_id: user.client_id,
      status: 1,
    });
  },

  /* ================= FIND BY ID ================= */
  findById: base.findById(MaterialCategory),

  /* ================= UPDATE ================= */
  update: async (id, data, user) => {
    const existing = await MaterialCategory.findOne({
      where: {
        client_id: user.client_id,
        category_name: data.category_name,
        id: { [Sequelize.Op.ne]: id },
      },
    });

    if (existing) {
      throw new Error(
        `Material category '${data.category_name}' already exists`
      );
    }

    return base.update(MaterialCategory)(id, data);
  },

  /* ================= SOFT DELETE ================= */
  remove: base.remove(MaterialCategory),
};
