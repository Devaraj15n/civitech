module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Material', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        material_name: DataTypes.STRING,
        material_category_id: DataTypes.INTEGER,
        unit: DataTypes.STRING,
        gst_percentage: DataTypes.DECIMAL(5,2),
        hsn_sac: DataTypes.STRING,
        specifications: DataTypes.TEXT,
        status: DataTypes.TINYINT
    }, {
        tableName: 'material_master',
        timestamps: false
    });
};
