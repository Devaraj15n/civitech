module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Party', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        party_name: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        party_type_id: DataTypes.INTEGER,
        gst_number: DataTypes.STRING,
        address: DataTypes.TEXT,
        opening_balance: DataTypes.DECIMAL(15,2),
        status: DataTypes.TINYINT
    }, {
        tableName: 'party_master',
        timestamps: false
    });
};
