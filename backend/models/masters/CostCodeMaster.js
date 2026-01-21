const { update } = require("../../controllers/base.controller");

module.exports = (sequelize, DataTypes) => {
    const CostCode = sequelize.define(
        "cost_code_master",
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

            cost_code: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },

            parent_cost_code_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

            cost_component: {
                type: DataTypes.ENUM("Material", "Labour", "Equipment", "Overhead"),
                allowNull: false,
            },

            description: DataTypes.TEXT,

            status: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
            },
        },
        {
            tableName: "cost_code_master",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    CostCode.associate = (models) => {
        // Client relation
        CostCode.belongsTo(models.client_master, {
            foreignKey: "client_id",
        });

        // Self reference
        CostCode.belongsTo(models.cost_code_master, {
            foreignKey: "parent_cost_code_id",
            as: "parentCostCode",
        });

        CostCode.hasMany(models.cost_code_master, {
            foreignKey: "parent_cost_code_id",
            as: "subCostCodes",
        });
    };

    return CostCode;
};
