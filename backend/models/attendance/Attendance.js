module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define(
        "attendance_master",
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

            is_present: {
                type: DataTypes.TINYINT(1),
                allowNull: false,
                defaultValue: 0, // 0 = Absent, 1 = Present
            },

            attendance_status: {
                type: DataTypes.ENUM(
                    "Present",
                    "Absent",
                    "Half Day",
                    "Leave",
                    "Holiday"
                ),
                allowNull: true,
            },

            status: {
                type: DataTypes.TINYINT(1),
                allowNull: false,
                defaultValue: 1, // 1 = Active, 0 = Inactive
            },

            /** Audit fields */
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
            tableName: "attendance_master",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    Attendance.associate = (models) => {
        Attendance.belongsTo(models.project_master, {
            foreignKey: "project_id",
        });

        Attendance.belongsTo(models.party_master, {
            foreignKey: "party_id",
        });

        Attendance.belongsTo(models.user_master, {
            foreignKey: "created_by",
            as: "creator",
        });

        Attendance.belongsTo(models.user_master, {
            foreignKey: "updated_by",
            as: "updater",
        });
    };

    return Attendance;
};