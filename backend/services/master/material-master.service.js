const base = require("../base.service");
const {
  material_master: Material,
  material_category_master: MaterialCategory,
} = require("../../models");
const { Sequelize } = require("sequelize");

module.exports = {
  /* ================= CREATE ================= */
  create: async (data, user) => {

    // 1️⃣ Validate category belongs to client
    const category = await MaterialCategory.findOne({
      where: {
        id: data.material_category_id,
        client_id: user.client_id,
        status: 1,
      },
    });

    if (!category) {
      throw new Error("Invalid material category");
    }

    // 2️⃣ Prevent duplicate material per client
    const existing = await Material.findOne({
      where: {
        client_id: user.client_id,
        material_name: data.material_name,
      },
    });

    if (existing) {
      throw new Error(
        `Material '${data.material_name}' already exists`
      );
    }

    // 3️⃣ Create material
    return base.create(Material)({
      client_id: user.client_id,
      material_name: data.material_name,
      material_category_id: data.material_category_id,
      unit: data.unit ?? null,
      gst_percentage: data.gst_percentage ?? null,
      hsn_sac: data.hsn_sac ?? null,
      specifications: data.specifications ?? null,
    });
  },

  /* ================= FIND ALL ================= */
  findAll: (_, user) => {
    return Material.findAll({
      where: {
        client_id: user.client_id,
        status: 1,
      },
      include: [
        {
          model: MaterialCategory,
          attributes: ["id", "category_name"],
        },
      ],
      order: [["material_name", "ASC"]],
    });
  },

  /* ================= FIND BY ID ================= */
  findById: async (id, user) => {
    return Material.findOne({
      where: {
        id,
        client_id: user.client_id,
        status: 1,
      },
      include: [
        {
          model: MaterialCategory,
          attributes: ["id", "category_name"],
        },
      ],
    });
  },

  /* ================= UPDATE ================= */
  update: async (id, data, user) => {

    // Prevent duplicate on update
    const existing = await Material.findOne({
      where: {
        client_id: user.client_id,
        material_name: data.material_name,
        id: { [Sequelize.Op.ne]: id },
      },
    });

    if (existing) {
      throw new Error(
        `Material '${data.material_name}' already exists`
      );
    }

    return base.update(Material)(id, {
      material_name: data.material_name,
      material_category_id: data.material_category_id,
      unit: data.unit,
      gst_percentage: data.gst_percentage,
      hsn_sac: data.hsn_sac,
      specifications: data.specifications,
    });
  },

  /* ================= SOFT DELETE ================= */
  remove: base.remove(Material),
};
