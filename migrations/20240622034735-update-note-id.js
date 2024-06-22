'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('notes', 'id')
    await queryInterface.addColumn('notes', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('notes', 'id')
    await queryInterface.addColumn('notes', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    })
  }
};
