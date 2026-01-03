module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project_master', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_code: DataTypes.STRING(50),
    project_name: DataTypes.STRING(200),
    client_party_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    project_value: DataTypes.DECIMAL(15,2),
    project_address: DataTypes.TEXT,
    orientation: DataTypes.STRING(100),
    dimension: DataTypes.STRING(150),
    attendance_radius: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('Planning','Ongoing','Completed','Hold'),
      defaultValue: 'Planning'
    },
  }, {
    tableName: 'project_master',
  });

  return Project;
};
