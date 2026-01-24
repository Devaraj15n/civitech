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

            client_id: {
                type: DataTypes.INTEGER,
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
            tableName: "workforce_master",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    Workforce.associate = (models) => {
        Workforce.belongsTo(models.workforce_type_master, {
            foreignKey: "worker_type_id",
        });

        Workforce.belongsTo(models.party_master, {
            foreignKey: "contractor_party_id",
        });

        Workforce.belongsTo(models.client_master, {
            foreignKey: "client_id",
        });
    };

    return Workforce;
};
