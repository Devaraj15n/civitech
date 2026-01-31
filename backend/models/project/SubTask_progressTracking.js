module.exports = (sequelize, DataTypes) => {
    const SubTaskProgressTracking = sequelize.define(
        "sub_task_progress_tracking",
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

            sub_task_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
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
            tableName: "sub_task_progress_tracking",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    SubTaskProgressTracking.associate = (models) => {
        SubTaskProgressTracking.belongsTo(models.project_master, {
            foreignKey: "project_id",
        });

        SubTaskProgressTracking.belongsTo(models.sub_task, {
            foreignKey: "sub_task_id",
            as: "subtask",
        });

        SubTaskProgressTracking.belongsTo(models.user_master, {
            foreignKey: "created_by",
            as: "creator",
        });

        SubTaskProgressTracking.belongsTo(models.user_master, {
            foreignKey: "updated_by",
            as: "updater",
        });

        SubTaskProgressTracking.hasMany(
            models.sub_task_progress_tracking_files,
            {
                foreignKey: "sub_task_progress_tracking_id",
                as: "files",
            }
        );

    };

    return SubTaskProgressTracking;
};
