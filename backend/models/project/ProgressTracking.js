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

            status: {
                type: DataTypes.TINYINT(1),
                allowNull: false,
                defaultValue: 1, // 1 = active, 0 = inactive (soft delete)
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

        ProgressTracking.belongsTo(models.task_master, {
            foreignKey: "task_id",
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
