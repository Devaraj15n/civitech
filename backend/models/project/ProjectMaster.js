module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "project_master",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      project_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      project_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },

      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      project_value: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },

      project_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      orientation: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      dimension: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },

      attendance_radius: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      project_status: {
        type: DataTypes.ENUM("Planning", "Ongoing", "Completed", "Hold"),
        defaultValue: "Planning",
      },

      status: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1, // 1 = active, 0 = inactive (soft delete)
      },

      /** Audit fields */
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "User ID who created the project",
      },

      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "User ID who last updated the project",
      },
    },
    {
      tableName: "project_master",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Project.associate = (models) => {
    Project.belongsTo(models.client_master, {
      foreignKey: "client_id",
    });

    Project.belongsTo(models.user_master, {
      foreignKey: "created_by",
      as: "creator",
    });

    Project.belongsTo(models.user_master, {
      foreignKey: "updated_by",
      as: "updater",
    });
  };

  return Project;
};
