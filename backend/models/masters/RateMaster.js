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
                type: DataTypes.ENUM("Material", "Labour", "Equipment"),
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
            tableName: "rate_master",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    Rate.associate = (models) => {
        Rate.belongsTo(models.client_master, {
            foreignKey: "client_id",
        });
    };

    return Rate;
};
