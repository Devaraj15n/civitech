module.exports = (sequelize, DataTypes) => {
    return sequelize.define('BOQ', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        project_id: DataTypes.INTEGER,
        boq_subject: DataTypes.STRING,
        unit: DataTypes.STRING,
        gst_percentage: DataTypes.DECIMAL(5,2),
        total_estimated_qty: DataTypes.DECIMAL(12,2),
        total_amount: DataTypes.DECIMAL(15,2),
        cost_code_id: DataTypes.INTEGER,
        created_at: DataTypes.DATE
    }, {
        tableName: 'boq_master',
        timestamps: false
    });
};
