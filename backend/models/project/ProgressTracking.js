module.exports = (sequelize, DataTypes) => {
  const ProgressTracking = sequelize.define(
    "progress_tracking",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      is_subtask: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0, // 0 = main task, 1 = subtask
        comment: "Indicates if progress is for a subtask",
      },

      progress_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      progress_quantity: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },

      progress_percentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0.0,
      },

      remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      location: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      status: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1, // 1 = active, 0 = inactive
      },

      /** Audit fields */
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "User ID who created the record",
      },

      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "User ID who last updated the record",
      },
    },
    {
      tableName: "progress_tracking",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  ProgressTracking.associate = (models) => {
    ProgressTracking.belongsTo(models.project_master, {
      foreignKey: "project_id",
    });

    // Optional polymorphic association
    ProgressTracking.belongsTo(models.task_master, {
      foreignKey: "task_id",
      constraints: false,
      as: "task",
      scope: { is_subtask: 0 }, // only main tasks
    });

    ProgressTracking.belongsTo(models.sub_task, {
      foreignKey: "task_id",
      constraints: false,
      as: "subtask",
      scope: { is_subtask: 1 }, // only subtasks
    });

    ProgressTracking.belongsTo(models.user_master, {
      foreignKey: "created_by",
      as: "creator",
    });

    ProgressTracking.belongsTo(models.user_master, {
      foreignKey: "updated_by",
      as: "updater",
    });
  };

  return ProgressTracking;
};
