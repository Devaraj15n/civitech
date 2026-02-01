module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        "task_master",
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

            task_name: {
                type: DataTypes.STRING(200),
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

            duration_days: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            unit: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },

            assigned_to: {
                type: DataTypes.JSON,
                allowNull: true,
                comment: "Array of user IDs assigned to this task",
            },

            task_status: {
                type: DataTypes.ENUM("Pending", "Ongoing", "Completed","Hold"),
                defaultValue: "Pending",
            },

            progress_percentage: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: true,
                defaultValue: 0.0,
            },

            status: {
                type: DataTypes.TINYINT(1),
                defaultValue: 1,
            },

            /** Audit fields */
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "User ID who created the task",
            },

            updated_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: "User ID who last updated the task",
            },
        },
        {
            tableName: "task_master",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    Task.associate = (models) => {
        Task.belongsTo(models.project_master, {
            foreignKey: "project_id",
        });

        Task.belongsTo(models.user_master, {
            foreignKey: "created_by",
            as: "creator",
        });

        Task.belongsTo(models.user_master, {
            foreignKey: "updated_by",
            as: "updater",
        });
    };

    return Task;
};
