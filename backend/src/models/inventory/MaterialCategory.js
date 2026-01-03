module.exports = (sequelize, DataTypes) => {
  return sequelize.define('material_category_master', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category_name: { type: DataTypes.STRING(100), allowNull: false },
    description: DataTypes.TEXT,
    status: { type: DataTypes.TINYINT, defaultValue: 1 },
  });
};
