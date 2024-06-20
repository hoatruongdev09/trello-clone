'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('notes', 'creator_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('notes', 'creator_id')
  }
};
