"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("party_master", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      party_name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      party_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      mobile: {
        type: Sequelize.STRING(15),
      },

      email: {
        type: Sequelize.STRING(100),
      },

      address: {
        type: Sequelize.TEXT,
      },

      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },

      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("party_master");
  },
};
