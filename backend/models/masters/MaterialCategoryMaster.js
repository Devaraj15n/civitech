module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "material_category_master",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      client_id: { type: DataTypes.INTEGER, allowNull: false },
      category_name: { type: DataTypes.STRING(100), allowNull: false },
      description: DataTypes.TEXT,
      status: { type: DataTypes.TINYINT, defaultValue: 1 },
    },
    {
      tableName: "material_category_master",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );
};
