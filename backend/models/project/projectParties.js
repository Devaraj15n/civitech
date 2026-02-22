module.exports = (sequelize, DataTypes) => {
  const ProjectParty = sequelize.define(
    "project_parties",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      party_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      assigned_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      removed_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Associations
  ProjectParty.associate = (models) => {
    ProjectParty.belongsTo(models.party_master, {
      foreignKey: "party_id",
      targetKey: "id",
      as: "party",
    });
  };



  return ProjectParty;
};