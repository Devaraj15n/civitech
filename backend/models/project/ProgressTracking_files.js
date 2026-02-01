module.exports = (sequelize, DataTypes) => {
    const ProgressTrackingFiles = sequelize.define(
        "progress_tracking_files",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            progress_tracking_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            file_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            file_path: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },

            file_type: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },

            file_size: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: "File size in bytes",
            },

            status: {
                type: DataTypes.TINYINT(1),
                defaultValue: 1,
            },

            uploaded_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "progress_tracking_files",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: false,
        }
    );

    ProgressTrackingFiles.associate = (models) => {
        ProgressTrackingFiles.belongsTo(models.progress_tracking, {
            foreignKey: "progress_tracking_id",
            as: "progress",
            onDelete: "CASCADE",
        });

        ProgressTrackingFiles.belongsTo(models.user_master, {
            foreignKey: "uploaded_by",
            as: "uploader",
        });
    };

    return ProgressTrackingFiles;
};
