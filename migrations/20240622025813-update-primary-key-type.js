'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('board_lists', 'board_id')
    await queryInterface.addColumn('board_lists', 'board_id', {
      type: Sequelize.UUID,
      allowNull: false
    })
    await queryInterface.removeColumn('boards', 'id')
    await queryInterface.addColumn('boards', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('board_lists', 'board_id')
    await queryInterface.addColumn('board_lists', 'board_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
    await queryInterface.removeColumn('boards', 'id')
    await queryInterface.addColumn('boards', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    })
  }
};
