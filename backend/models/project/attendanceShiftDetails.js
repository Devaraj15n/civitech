module.exports = (sequelize, DataTypes) => {
    const AttendanceShift = sequelize.define(
        "attendance_shift_details",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            attendance_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            shift_no: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            check_in: {
                type: DataTypes.DATE,
            },

            check_out: {
                type: DataTypes.DATE,
            },

            overtime_hours: {
                type: DataTypes.DECIMAL(5, 2),
                defaultValue: 0,
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
            tableName: "attendance_shift_details",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    AttendanceShift.associate = (models) => {
        AttendanceShift.belongsTo(models.attendance_master, {
            foreignKey: "attendance_id",
        });
    };

    return AttendanceShift;
};