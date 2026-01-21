module.exports = (sequelize, DataTypes) => {
    const Deduction = sequelize.define(
        "deduction_master",
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
            description: {
                type: DataTypes.TEXT,
            },
        },
        {
            tableName: "deduction_master",
            timestamps: false, // no created_at / updated_at in Excel
        }
    );

    Deduction.associate = (models) => {
        // No relations defined currently
    };

    return Deduction;
};
