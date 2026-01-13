module.exports = (sequelize, DataTypes) => {
  const Finance = sequelize.define(
    "finance_transaction",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      project_id: DataTypes.INTEGER,
      party_id: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
      transaction_type: DataTypes.STRING,
      transaction_date: DataTypes.DATE,
    },
    {
      tableName: "finance_transaction",
      timestamps: true,
    }
  );

  Finance.associate = (models) => {
    Finance.belongsTo(models.project_master, { foreignKey: "project_id" });
    Finance.belongsTo(models.party_master, { foreignKey: "party_id" });
  };

  return Finance;
};
