module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Task', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        project_id: DataTypes.INTEGER,
        task_name: DataTypes.STRING,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        duration_days: DataTypes.INTEGER,
        assigned_to: DataTypes.INTEGER,
        status: DataTypes.ENUM('Pending','In Progress','Completed')
    }, {
        tableName: 'task_master',
        timestamps: false
    });
};
