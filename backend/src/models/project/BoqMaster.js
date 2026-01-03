module.exports = (sequelize, DataTypes) => {
  return sequelize.define('boq_master', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    boq_subject: DataTypes.STRING(200),
    unit: DataTypes.STRING(50),
    gst_percentage: DataTypes.DECIMAL(5,2),
    total_estimated_qty: DataTypes.DECIMAL(12,2),
    total_amount: DataTypes.DECIMAL(15,2),
  });
};
