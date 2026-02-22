module.exports = (sequelize, DataTypes) => {
    const SubTaskProgressMessageFile = sequelize.define(
        "subtask_progress_message_file",
        {
            message_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            file_path: DataTypes.STRING,
            file_type: DataTypes.STRING,
            status: { type: DataTypes.INTEGER, defaultValue: 1 },
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER,
        },
        {
            tableName: "subtask_progress_message_files",
            timestamps: true,
        }
    );

    SubTaskProgressMessageFile.associate = (models) => {
        SubTaskProgressMessageFile.belongsTo(models.sub_task_progress_tracking_message, {
            foreignKey: "message_id",
            as: "message",
        });
    };

    return SubTaskProgressMessageFile;
};
