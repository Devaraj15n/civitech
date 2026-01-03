module.exports = (sequelize, DataTypes) => {
  return sequelize.define('attendance', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    attendance_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Present', 'Absent', 'Week Off', 'Leave'),
      allowNull: false,
    },
    shift_hours: {
      type: DataTypes.DECIMAL(5,2),
      defaultValue: 0,
    },
    overtime_hours: {
      type: DataTypes.DECIMAL(5,2),
      defaultValue: 0,
    },
  });
};
