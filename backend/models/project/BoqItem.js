module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "boq_item",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      boq_id: DataTypes.INTEGER,
      item_name: DataTypes.STRING,
      quantity: DataTypes.FLOAT,
      unit: DataTypes.STRING,
      rate: DataTypes.FLOAT,
    },
    {
      tableName: "boq_item",
      timestamps: true,
    }
  );
};
