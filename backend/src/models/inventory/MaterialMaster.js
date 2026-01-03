module.exports = (sequelize, DataTypes) => {
  return sequelize.define('material_master', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    material_name: DataTypes.STRING(150),
    unit: DataTypes.STRING(50),
    gst_percentage: DataTypes.DECIMAL(5,2),
    hsn_sac: DataTypes.STRING(20),
    specifications: DataTypes.TEXT,
    status: DataTypes.TINYINT,
  });
};
