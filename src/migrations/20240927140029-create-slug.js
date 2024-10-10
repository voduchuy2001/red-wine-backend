'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Slugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false
      },
      referenceType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      referenceId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      prefix: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Slugs')
  }
}
