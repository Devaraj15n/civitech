module.exports = (sequelize, DataTypes) => {
  const WorkforceType = sequelize.define(
    "workforce_type_master",
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

      worker_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      employment_type: {
        type: DataTypes.ENUM("Daily", "Hourly", "Monthly"),
        allowNull: false,
      },

      salary_per_hour: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
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
      tableName: "workforce_type_master",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          unique: true,
          fields: ["client_id", "worker_type"], // unique per client
        },
      ],
    }
  );

  WorkforceType.associate = (models) => {
    WorkforceType.hasMany(models.workforce_master, {
      foreignKey: "worker_type_id",
    });
  };

  return WorkforceType;
};
