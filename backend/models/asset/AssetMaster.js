module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    "asset_master",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      asset_name: DataTypes.STRING,
      asset_type_id: DataTypes.INTEGER,
    },
    {
      tableName: "asset_master",
      timestamps: true,
    }
  );

  Asset.associate = (models) => {
    Asset.belongsTo(models.asset_type_master, {
      foreignKey: "asset_type_id",
    });
  };

  
  return Asset;
};
