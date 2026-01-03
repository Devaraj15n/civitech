module.exports = (sequelize, DataTypes) => {
  return sequelize.define('party_type_master', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    party_type: DataTypes.STRING(50),
  }, { timestamps: false });
};
