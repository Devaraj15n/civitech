module.exports = (sequelize, DataTypes) => {
    const ProgressTrackingMessageFile = sequelize.define(
        "progress_tracking_message_file",
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
            tableName: "progress_tracking_message_file",
            timestamps: true,
        }
    );

    // ✅ Use the associate function, Sequelize injects all models via db
    ProgressTrackingMessageFile.associate = (models) => {
        ProgressTrackingMessageFile.belongsTo(models.progress_tracking_message, {
            foreignKey: "message_id",
            as: "message",
        });
    };

    return ProgressTrackingMessageFile;
};
