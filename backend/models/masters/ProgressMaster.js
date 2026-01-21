module.exports = (sequelize, DataTypes) => {
    const Progress = sequelize.define(
        "progress_master",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
            },
        },
        {
            tableName: "progress_master",
            timestamps: false, // no created_at / updated_at in Excel
        }
    );

    Progress.associate = (models) => {
        // Can be linked to work orders / project tracking later
    };

    return Progress;
};
