module.exports = (sequelize, DataTypes) => {
    const SubTask = sequelize.define(
        "sub_task",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            task_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            sub_task_name: {
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

            progress_percentage: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: true,
                defaultValue: 0.0,
            },

            notes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            status: {
                type: DataTypes.TINYINT(1),
                defaultValue: 1,
            },

            /** Audit fields */
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "User ID who created the subtask",
            },

            updated_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: "User ID who last updated the subtask",
            },
        },
        {
            tableName: "sub_task",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    SubTask.associate = (models) => {
        SubTask.belongsTo(models.task_master, {
            foreignKey: "task_id",
        });

        SubTask.belongsTo(models.user_master, {
            foreignKey: "created_by",
            as: "creator",
        });

        SubTask.belongsTo(models.user_master, {
            foreignKey: "updated_by",
            as: "updater",
        });
    };

    return SubTask;
};
