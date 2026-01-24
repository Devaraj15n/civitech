module.exports = (sequelize, DataTypes) => {
  const AssetType = sequelize.define(
    "asset_type_master",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      asset_type_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      unit: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      cost_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },

      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "asset_type_master",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          unique: true,
          fields: ["client_id", "asset_type_name"], // prevent duplicates per client
        },
      ],
    }
  );

  AssetType.associate = (models) => {
    AssetType.belongsTo(models.client_master, {
      foreignKey: "client_id",
    });
  };

  return AssetType;
};
