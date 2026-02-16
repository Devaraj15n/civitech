module.exports = (sequelize, DataTypes) => {
    const ProgressActivityTimeline = sequelize.define(
        "progress_activity_timeline",
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
                allowNull: true,
            },

            sub_task_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

            activity_type: {
                type: DataTypes.ENUM(
                    "TASK_PROGRESS",
                    "SUB_TASK_PROGRESS",
                    "TASK_MESSAGE",
                    "SUB_TASK_MESSAGE"
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
            tableName: "progress_activity_timeline",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: false,
        }
    );

    ProgressActivityTimeline.associate = (models) => {
        ProgressActivityTimeline.belongsTo(models.project_master, {
            foreignKey: "project_id",
        });

        ProgressActivityTimeline.belongsTo(models.task_master, {
            foreignKey: "task_id",
        });

        ProgressActivityTimeline.belongsTo(models.sub_task, {
            foreignKey: "sub_task_id",
        });
    };

    return ProgressActivityTimeline;
};
