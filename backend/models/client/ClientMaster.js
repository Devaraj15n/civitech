module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
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
        unique: true,
        comment: "Unique client identifier / tenant code",
      },

      client_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },

      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        comment: "1=Active, 0=Inactive",
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "client_master",
      timestamps: true,
      paranoid: true,        // enables soft delete
      deletedAt: "deleted_at",

      indexes: [
        {
          unique: true,
          fields: ["client_code"],
        },
        {
          unique: true,
          fields: ["email"],
        },
        {
          fields: ["status"],
        },
      ],
    }
  );

  /* ================= Associations ================= */
  Client.associate = (models) => {
    Client.hasMany(models.user_master, {
      foreignKey: "client_id",
    });

    Client.hasMany(models.party_master, {
      foreignKey: "client_id",
    });

    // Example: link to other masters
    Client.hasMany(models.material_master, {
      foreignKey: "client_id",
    });

    Client.hasMany(models.asset_type_master, {
      foreignKey: "client_id",
    });
  };

  return Client;
};
