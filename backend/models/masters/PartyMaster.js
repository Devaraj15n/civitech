module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define(
    "party_master",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      party_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },

      party_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      mobile: {
        type: DataTypes.STRING(15),
      },

      email: {
        type: DataTypes.STRING(100),
      },

      address: {
        type: DataTypes.TEXT,
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "party_master",
      timestamps: true, // createdAt, updatedAt
      paranoid: true, // deletedAt (SOFT DELETE)
    }
  );

  Party.associate = (models) => {
    Party.hasMany(models.project_master, {
      foreignKey: "client_party_id",
    });
  };

  return Party;
};
