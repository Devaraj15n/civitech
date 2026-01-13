module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "project_master",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      project_name: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      client_party_id: {
        type: DataTypes.INTEGER
      },
      start_date: {
        type: DataTypes.DATE
      },
      end_date: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.ENUM('Planning', 'Ongoing', 'Completed', 'Hold'),
        defaultValue: 'Planning'
      }
    },
    {
      tableName: "project_master",
      timestamps: true,     // createdAt, updatedAt
      paranoid: true        // deletedAt (SOFT DELETE)
    }
  );

  Project.associate = (models) => {
    Project.belongsTo(models.party_master, {
      foreignKey: "client_party_id"
    });
    Project.hasMany(models.boq_master, {
      foreignKey: "project_id"
    });
  };

  return Project;
};
