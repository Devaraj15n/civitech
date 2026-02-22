module.exports = (sequelize, DataTypes) => {
    const PartyPayroll = sequelize.define(
        "party_payroll_details",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            party_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            salary_amount: {
                type: DataTypes.DECIMAL(12, 2),
                allowNull: false,
            },

            salary_type: {
                type: DataTypes.ENUM("Monthly", "Per Shift", "Daily"),
                defaultValue: "Monthly",
            },

            shift_hours: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
            },

            overtime_rate: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },

            // designation_id: {
            //     type: DataTypes.INTEGER,
            // },

            cost_code_id: {
                type: DataTypes.INTEGER,
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
            },
        },
        {
            tableName: "party_payroll_details",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    PartyPayroll.associate = (models) => {
        PartyPayroll.belongsTo(models.party_master, {
            foreignKey: "party_id",
        });

        // PartyPayroll.belongsTo(models.designation_master, {
        //     foreignKey: "designation_id",
        // });

        PartyPayroll.belongsTo(models.cost_code_master, {
            foreignKey: "cost_code_id",
        });
    };

    return PartyPayroll;
};