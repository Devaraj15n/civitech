module.exports = (sequelize, DataTypes) => {
  const ProjectPartyPayroll = sequelize.define(
    'project_party_payroll',
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
      project_party_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      party_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      payroll_detail_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      salary_amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      salary_type: {
        type: DataTypes.ENUM('Monthly', 'Per Shift', 'Daily'),
        allowNull: false,
        defaultValue: 'Monthly',
      },
      month: {
        type: DataTypes.INTEGER, // Store as YYYYMM or just YEAR (YEAR type is sometimes tricky in Sequelize)
        allowNull: false,
      },
      total_shifts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      total_days: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      overtime_hours: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.0,
      },
      overtime_amount: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.0,
      },
      total_payable: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
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
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      indexes: [
        {
          unique: true,
          fields: ['project_id', 'project_party_id', 'month'],
          name: 'unique_project_party_month',
        },
      ],
    }
  );

  ProjectPartyPayroll.associate = (models) => {
    ProjectPartyPayroll.belongsTo(models.project_master, {
      foreignKey: 'project_id',
      as: 'project',
    });
    ProjectPartyPayroll.belongsTo(models.project_parties, {
      foreignKey: 'project_party_id',
      as: 'projectParty',
    });
    ProjectPartyPayroll.belongsTo(models.party_master, {
      foreignKey: 'party_id',
      as: 'party',
    });
    ProjectPartyPayroll.belongsTo(models.party_payroll_details, {
      foreignKey: 'payroll_detail_id',
      as: 'payrollDetail',
    });
  };

  return ProjectPartyPayroll;
};