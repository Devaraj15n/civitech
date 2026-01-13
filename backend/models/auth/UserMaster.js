module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user_master",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Tenant (client) this user belongs to",
      },

      party_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Linked party (only for party users)",
      },

      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },

      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      user_type: {
        type: DataTypes.ENUM(
          "SUPERADMIN",
          "CLIENT_ADMIN",
          "PARTY_USER",
          "STAFF"
        ),
        allowNull: false,
      },

      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },

      last_login_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "user_master",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",

      indexes: [
        {
          unique: true,
          fields: ["username"],
        },
        {
          unique: true,
          fields: ["email"],
        },
        {
          fields: ["client_id"],
        },
        {
          fields: ["party_id"],
        },
      ],
    }
  );

  /* ================= Associations ================= */
  User.associate = (models) => {
    User.belongsTo(models.client_master, {
      foreignKey: "client_id",
    });

    User.belongsTo(models.party_master, {
      foreignKey: "party_id",
    });
  };

  return User;
};
