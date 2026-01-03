module.exports = (sequelize, DataTypes) => {
  return sequelize.define('boq_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    item_name: DataTypes.STRING(200),
    item_code: DataTypes.STRING(50),
    unit: DataTypes.STRING(50),
    estimated_qty: DataTypes.DECIMAL(12,2),
    unit_cost_price: DataTypes.DECIMAL(12,2),
    markup: DataTypes.DECIMAL(5,2),
    unit_sale_price: DataTypes.DECIMAL(12,2),
    cost_component: DataTypes.ENUM('Material','Labour','Asset'),
  });
};
