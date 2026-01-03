module.exports = (sequelize, DataTypes) => {
  return sequelize.define('party_master', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    party_name: DataTypes.STRING(150),
    phone: DataTypes.STRING(15),
    email: DataTypes.STRING(100),
    party_type_id: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    gst_number: DataTypes.STRING(20),
    status: DataTypes.TINYINT,
  }, {
    tableName: 'party_master',
  });
};
