module.exports = (sequelize, DataTypes) => {
  const Workforce = sequelize.define(
    "workforce_master",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      worker_name: DataTypes.STRING,
      worker_type_id: DataTypes.INTEGER,
      mobile: DataTypes.STRING,
    },
    {
      tableName: "workforce_master",
      timestamps: true,
    }
  );

  Workforce.associate = (models) => {
    Workforce.belongsTo(models.workforce_type_master, {
      foreignKey: "worker_type_id",
    });
  };

  return Workforce;
};
