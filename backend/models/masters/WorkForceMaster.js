module.exports = (sequelize, DataTypes) => {
    const Workforce = sequelize.define(
        "workforce_master",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            worker_type_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date_of_joining: {
                type: DataTypes.DATEONLY,
            },
            aadhaar: {
                type: DataTypes.STRING(12),
            },
            pan: {
                type: DataTypes.STRING(10),
            },
            contractor_party_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            status: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
            },
        },
        {
            tableName: "workforce_master",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: false,
        }
    );

    Workforce.associate = (models) => {
        // Workforce Type
        Workforce.belongsTo(models.workforce_type_master, {
            foreignKey: "worker_type_id",
        });

        // Contractor Party
        Workforce.belongsTo(models.party_master, {
            foreignKey: "contractor_party_id",
        });
    };

    return Workforce;
};
