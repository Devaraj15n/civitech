"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("client_master", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      client_code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },

      client_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(100),
      },

      phone: {
        type: Sequelize.STRING(15),
      },

      status: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
        comment: "1 = Active, 0 = Inactive",
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("client_master");
  },
};
