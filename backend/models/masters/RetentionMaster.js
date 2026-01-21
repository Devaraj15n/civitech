module.exports = (sequelize, DataTypes) => {
    const Retention = sequelize.define(
        "retention_master",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            item_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            percentage: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
            },
            duration_days: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "retention_master",
            timestamps: false, // no created_at / updated_at mentioned
        }
    );

    Retention.associate = (models) => {
        // No relationships defined currently
    };

    return Retention;
};
