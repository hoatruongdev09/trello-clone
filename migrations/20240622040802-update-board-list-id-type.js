'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('board_lists', 'id')
    await queryInterface.addColumn('board_lists', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    })
    await queryInterface.removeColumn('notes', 'board_list_id')
    await queryInterface.addColumn('notes', 'board_list_id', {
      type: Sequelize.UUID,
      allowNull: false
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('board_lists', 'id')
    await queryInterface.addColumn('board_lists', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    })
    await queryInterface.removeColumn('notes', 'board_list_id')
    await queryInterface.addColumn('notes', 'board_list_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  }
};
