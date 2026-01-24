const base = require("../base.service");
const {
  material_master: Material,
} = require("../../models");
const { Op } = require("sequelize");

module.exports = {
  /* ================= CREATE ================= */
  create: async (data, user) => {
    // Prevent duplicate material per client + category
    const existing = await Material.findOne({
      where: {
        client_id: user.client_id,
        material_name: data.material_name,
        material_category_id: data.category_id,
        deleted_at: null,
      },
    });

    if (existing) {
      throw new Error(
        `Material '${data.material_name}' already exists`
      );
    }

    return base.create(Material)({
      client_id: user.client_id,
      material_name: data.material_name,
      material_category_id: data.category_id,
      unit: data.unit ?? null,
      gst_percentage: data.gst_percentage ?? null,
      hsn_sac: data.hsn_sac ?? null,
      specifications: data.specifications ?? null,
      status: data.status ?? 1,
    });
  },

  /* ================= FIND ALL ================= */
  findAll: (_, user) => {
    return base.findAll(Material)({
      client_id: user.client_id,
      deleted_at: null,
    });
  },

  /* ================= FIND BY ID ================= */
  findById: base.findById(Material),

  /* ================= UPDATE ================= */
  update: async (id, data, user) => {
    const existing = await Material.findOne({
      where: {
        client_id: user.client_id,
        material_name: data.material_name,
        material_category_id: data.category_id,
        id: { [Op.ne]: id },
        deleted_at: null,
      },
    });

    if (existing) {
      throw new Error(
        `Material '${data.material_name}' already exists`
      );
    }

    return base.update(Material)(id, {
      material_name: data.material_name,
      material_category_id: data.category_id,
      unit: data.unit ?? null,
      gst_percentage: data.gst_percentage ?? null,
      hsn_sac: data.hsn_sac ?? null,
      specifications: data.specifications ?? null,
      status: data.status,
    });
  },

  /* ================= SOFT DELETE ================= */
  remove: async (id) => {
    return base.update(Material)(id, {
      deleted_at: new Date(),
    });
  },
};
