module.exports = (sequelize, DataTypes) => {
  return sequelize.define('workforce_type_master', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    worker_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    employment_type: {
      type: DataTypes.ENUM('Daily', 'Hourly', 'Monthly'),
      allowNull: false,
    },
    salary_per_hour: {
      type: DataTypes.DECIMAL(10,2),
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  });
};
