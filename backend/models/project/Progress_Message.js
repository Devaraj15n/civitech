module.exports = (sequelize, DataTypes) => {
    const ProgressTrackingMessage = sequelize.define(
        "progress_tracking_message",
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

            message: {
                type: DataTypes.TEXT,
                allowNull: false,
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
            tableName: "progress_tracking_messages",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    ProgressTrackingMessage.associate = (models) => {
        ProgressTrackingMessage.belongsTo(models.project_master, {
            foreignKey: "project_id",
        });

        ProgressTrackingMessage.belongsTo(models.task_master, {
            foreignKey: "task_id",
            as: "task",
        });

        ProgressTrackingMessage.belongsTo(models.user_master, {
            foreignKey: "created_by",
            as: "creator",
        });

        ProgressTrackingMessage.belongsTo(models.user_master, {
            foreignKey: "updated_by",
            as: "updater",
        });

        ProgressTrackingMessage.hasMany(models.progress_tracking_message_file, {
            foreignKey: "message_id",
            as: "files",
        });

    };
    return ProgressTrackingMessage;
};