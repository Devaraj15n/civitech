module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Project', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        project_code: DataTypes.STRING,
        project_name: DataTypes.STRING,
        client_party_id: DataTypes.INTEGER,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        project_value: DataTypes.DECIMAL(15,2),
        project_address: DataTypes.TEXT,
        orientation: DataTypes.STRING,
        dimension: DataTypes.STRING,
        attendance_radius: DataTypes.INTEGER,
        status: DataTypes.ENUM('Planning','Ongoing','Completed','Hold'),
        created_at: DataTypes.DATE
    }, {
        tableName: 'project_master',
        timestamps: false
    });
};
