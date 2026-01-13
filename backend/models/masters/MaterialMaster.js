module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "material_master",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      client_id: { type: DataTypes.INTEGER, allowNull: false },
      material_name: { type: DataTypes.STRING(150), allowNull: false },
      material_category_id: { type: DataTypes.INTEGER, allowNull: false },
      unit: DataTypes.STRING(50),
      gst_percentage: DataTypes.DECIMAL(5, 2),
      hsn_sac: DataTypes.STRING(20),
      specifications: DataTypes.TEXT,
      status: { type: DataTypes.TINYINT, defaultValue: 1 },
    },
    {
      tableName: "material_master",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );
};
