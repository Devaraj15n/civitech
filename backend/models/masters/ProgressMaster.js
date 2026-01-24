module.exports = (sequelize, DataTypes) => {
    const Progress = sequelize.define(
        "progress_master",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            client_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            percentage: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            status: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
            },

            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "Client user id who created the record",
            },

            updated_by: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: "Client user id who last updated the record",
            },
        },
        {
            tableName: "progress_master",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    Progress.associate = (models) => {
        Progress.belongsTo(models.client_master, {
            foreignKey: "client_id",
        });
    };

    return Progress;
};
