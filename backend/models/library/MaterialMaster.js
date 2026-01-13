module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define(
    "material_master",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      material_name: DataTypes.STRING,
      material_category_id: DataTypes.INTEGER,
      unit: DataTypes.STRING,
      rate: DataTypes.FLOAT,
    },
    {
      tableName: "material_master",
      timestamps: true,
    }
  );

  Material.associate = (models) => {
    Material.belongsTo(models.material_category_master, {
      foreignKey: "material_category_id",
    });
  };

  return Material;
};
