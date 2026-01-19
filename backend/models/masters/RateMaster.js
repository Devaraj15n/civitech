module.exports = (sequelize, DataTypes) => {
    const Rate = sequelize.define(
        "rate_master",
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
            item_name: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            item_code: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            unit: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            gst_percentage: {
                type: DataTypes.DECIMAL(5, 2),
                defaultValue: 0.0,
            },
            cost_component: {
                type: DataTypes.ENUM(
                    "Material",
                    "Labour",
                    "Equipment"
                ),
                allowNull: false,
            },
            unit_cost_price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            markup_percentage: {
                type: DataTypes.DECIMAL(5, 2),
                defaultValue: 0.0,
            },
            additional_fees: {
                type: DataTypes.DECIMAL(10, 2),
                defaultValue: 0.0,
            },
            unit_sale_price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
        },
        {
            tableName: "rate_master",
            timestamps: true,   // createdAt & updatedAt
            createdAt: "created_at",
            updatedAt: false,   // since only created_at exists
        }
    );

    Rate.associate = (models) => {
        // No FK mentioned currently
        // Can be linked later with material/workforce/equipment tables if needed
        Rate.belongsTo(models.client_master, {
            foreignKey: "client_id",
        });
    };

    return Rate;
};
