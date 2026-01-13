module.exports = (sequelize, DataTypes) => {
  const PartyType = sequelize.define(
    "party_type_master",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      client_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // NULL = global
      },

      party_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "party_type_master",
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",

      indexes: [
        {
          unique: true,
          fields: ["party_type", "client_id"],
          name: "uq_party_type_client",
        },
      ],
    }
  );

  PartyType.associate = (models) => {
    PartyType.belongsTo(models.client_master, {
      foreignKey: "client_id",
    });

    PartyType.hasMany(models.party_master, {
      foreignKey: "party_type_id",
    });
  };

  return PartyType;
};
