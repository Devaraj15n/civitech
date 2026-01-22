module.exports = (sequelize, DataTypes) => {
  const ClientMaster = sequelize.define(
    "client_master",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      client_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // unique: true,
      },
      client_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      email: DataTypes.STRING(100),
      phone: DataTypes.STRING(15),
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    {
      tableName: "client_master",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  return ClientMaster;
};
