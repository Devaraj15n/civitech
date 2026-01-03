module.exports = (sequelize, DataTypes) => {
  return sequelize.define('party_master', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    party_name: DataTypes.STRING(150),
    phone: DataTypes.STRING(15),
    email: DataTypes.STRING(100),
    address: DataTypes.TEXT,
    gst_number: DataTypes.STRING(20),
    pan_number: DataTypes.STRING(10),
    aadhaar_number: DataTypes.STRING(12),
    status: DataTypes.TINYINT,
  });
};
