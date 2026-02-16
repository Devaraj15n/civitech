module.exports = (sequelize, DataTypes) => {
    const SubTaskActivityTimeline = sequelize.define(
        "sub_task_activity_timeline",
        {
            id: {
                type: DataTypes.BIGINT,
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

            sub_task_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            activity_type: {
                type: DataTypes.ENUM(
                    "SUB_TASK_PROGRESS",
                    "SUB_TASK_MESSAGE",
                    "SUB_TASK_PROGRESS_FILE"
                ),
                allowNull: false,
            },

            reference_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "sub_task_activity_timeline",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: false,
        }
    );

    SubTaskActivityTimeline.associate = (models) => {
        SubTaskActivityTimeline.belongsTo(models.project_master, {
            foreignKey: "project_id",
        });

        SubTaskActivityTimeline.belongsTo(models.task_master, {
            foreignKey: "task_id",
        });

        SubTaskActivityTimeline.belongsTo(models.sub_task, {
            foreignKey: "sub_task_id",
        });
    };

    return SubTaskActivityTimeline;
};
