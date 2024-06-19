'use strict';

const sequelize = require('../src/database/db');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "refresh_token", {
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "refresh_token")
    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
    })
  }
};
