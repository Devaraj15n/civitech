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

            attendance_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },

            shift_count: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },

            overtime_hours: {
                type: DataTypes.DECIMAL(5, 2),
                defaultValue: 0,
            },

            attendance_status: {
                type: DataTypes.ENUM(
                    "Present",
                    "Absent",
                    "Half Day",
                    "Paid Leave",
                    "Unpaid Leave",
                    "Week Off"
                ),
                defaultValue: "Present",
            },

            status: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
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
            tableName: "attendance_master",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            indexes: [
                {
                    unique: true,
                    fields: ["project_id", "party_id", "attendance_date"],
                },
            ],
        }
    );
    

    Attendance.associate = (models) => {
        Attendance.belongsTo(models.project_master, { foreignKey: "project_id" });
        Attendance.belongsTo(models.party_master, { foreignKey: "party_id" });

        Attendance.belongsTo(models.user_master, {
            foreignKey: "created_by",
            as: "creator",
        });

        Attendance.belongsTo(models.user_master, {
            foreignKey: "updated_by",
            as: "updater",
        });

        Attendance.hasMany(models.attendance_shift_details, {
            foreignKey: "attendance_id",
            as: "shifts",
        });
        
    };

    return Attendance;
};