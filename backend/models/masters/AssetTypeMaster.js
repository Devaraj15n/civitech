module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "asset_type_master",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      type_name: DataTypes.STRING,
    },
    {
      tableName: "asset_type_master",
      timestamps: false,
    }
  );
};
