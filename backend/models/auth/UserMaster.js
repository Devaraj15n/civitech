module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user_master",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      client_id: { type: DataTypes.INTEGER, allowNull: false },
      party_id: { type: DataTypes.INTEGER, allowNull: true },
      username: { type: DataTypes.STRING(100), allowNull: false },
      phone: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(100), allowNull: false },
      password_hash: { type: DataTypes.STRING(255), allowNull: false },
      user_type: {
        type: DataTypes.ENUM("SUPERADMIN","CLIENT_ADMIN","PARTY_USER","STAFF"),
        allowNull: false
      },
      status: { type: DataTypes.TINYINT, defaultValue: 1 },
      last_login_at: { type: DataTypes.DATE, allowNull: true },
      deleted_at: { type: DataTypes.DATE, allowNull: true }
    },
    {
      tableName: "user_master",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
      indexes: [
        { unique: true, fields: ["username"] },
        { unique: true, fields: ["email"] },
        { fields: ["client_id"] },
        { fields: ["party_id"] }
      ]
    }
  );

  /* ================= Associations ================= */
  User.associate = (models) => {
    // ✅ Add alias 'client' to match your login query
    User.belongsTo(models.client_master, {
      foreignKey: "client_id",
      as: "client"
    });

    User.belongsTo(models.party_master, {
      foreignKey: "party_id",
      as: "party" // optional alias if you want to include party
    });
  };

  return User;
};
