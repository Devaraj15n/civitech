module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define(
    "party_master",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      party_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      phone: DataTypes.STRING(15),
      email: DataTypes.STRING(100),
      address: DataTypes.TEXT,

      gst_number: DataTypes.STRING(20),
      pan_number: DataTypes.STRING(20),
      aadhaar_number: DataTypes.STRING(20),

      party_type_id: {
        type: DataTypes.INTEGER,
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
      tableName: "party_master",
      timestamps: true,
      paranoid: true, // enables soft delete
      deletedAt: "deleted_at",
    }
  );

  Party.associate = (models) => {
    Party.belongsTo(models.client_master, {
      foreignKey: "client_id",
    });

    Party.belongsTo(models.party_type_master, {
      foreignKey: "party_type_id",
      as: "partyType",
    });

    Party.hasMany(models.finance_transaction, {
      foreignKey: "party_id",
    });
    Party.hasMany(models.project_parties, {
      foreignKey: "party_id",
      sourceKey: "id",
      as: "projectParties",
    });
  };

  return Party;
};
