module.exports = (sequelize, DataTypes) => {
  const BOQ = sequelize.define(
    "boq_master",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      project_id: DataTypes.INTEGER,
      boq_name: DataTypes.STRING,
    },
    {
      tableName: "boq_master",
      timestamps: true,
    }
  );

  BOQ.associate = (models) => {
    BOQ.belongsTo(models.project_master, { foreignKey: "project_id" });
    BOQ.hasMany(models.boq_item, { foreignKey: "boq_id" });
  };

  return BOQ;
};
