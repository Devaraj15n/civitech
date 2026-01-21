// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define(
//     "workforce_type_master",
//     {
//       id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//       type_name: DataTypes.STRING,
//     },
//     {
//       tableName: "workforce_type_master",
//       timestamps: false,
//     }
//   );
// };

module.exports = (sequelize, DataTypes) => {
  const WorkforceType = sequelize.define(
    "workforce_type_master",
    {
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
        type: DataTypes.ENUM("Daily", "Hourly", "Monthly"),
        allowNull: false,
      },
      salary_per_hour: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    {
      tableName: "workforce_type_master",
      timestamps: false, // no created_at / updated_at mentioned
    }
  );

  WorkforceType.associate = (models) => {
    WorkforceType.hasMany(models.workforce_master, {
      foreignKey: "worker_type_id",
    });
  };

  return WorkforceType;
};
