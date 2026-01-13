module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "attendance",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      workforce_id: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      status: DataTypes.STRING,
    },
    {
      tableName: "attendance",
      timestamps: false,
    }
  );

  Attendance.associate = (models) => {
    Attendance.belongsTo(models.workforce_master, {
      foreignKey: "workforce_id",
    });
  };

  return Attendance;
};
