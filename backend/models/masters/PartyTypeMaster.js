module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "party_master",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      client_id: { type: DataTypes.INTEGER, allowNull: false },
      party_name: { type: DataTypes.STRING(150), allowNull: false },
      phone: DataTypes.STRING(15),
      email: DataTypes.STRING(100),
      party_type_id: { type: DataTypes.INTEGER, allowNull: false },
      address: DataTypes.TEXT,
      gst_number: DataTypes.STRING(20),
      pan_number: DataTypes.STRING(10),
      aadhaar_number: DataTypes.STRING(12),
      status: { type: DataTypes.TINYINT, defaultValue: 1 },
    },
    {
      tableName: "party_master",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );
};
