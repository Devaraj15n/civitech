module.exports = (sequelize, DataTypes) => {
    const SubTaskProgressTrackingMessage = sequelize.define(
        "sub_task_progress_tracking_message",
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
            tableName: "sub_task_progress_tracking_messages",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    SubTaskProgressTrackingMessage.associate = (models) => {
        SubTaskProgressTrackingMessage.belongsTo(models.project_master, {
            foreignKey: "project_id",
        });

        SubTaskProgressTrackingMessage.belongsTo(models.sub_task, {
            foreignKey: "sub_task_id",
            as: "subtask",
        });

        SubTaskProgressTrackingMessage.belongsTo(models.user_master, {
            foreignKey: "created_by",
            as: "creator",
        });

        SubTaskProgressTrackingMessage.belongsTo(models.user_master, {
            foreignKey: "updated_by",
            as: "updater",
        });

        SubTaskProgressTrackingMessage.hasMany(models.subtask_progress_message_file, {
            foreignKey: "message_id",
            as: "files",
        });
    };

    return SubTaskProgressTrackingMessage;
};
