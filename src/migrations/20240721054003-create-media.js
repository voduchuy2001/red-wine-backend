'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Media', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      mediable: {
        type: Sequelize.STRING
      },
      mediableId: {
        type: Sequelize.BIGINT
      },
      type: {
        type: Sequelize.STRING
      },
      mimeType: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      alt: {
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
    await queryInterface.dropTable('Media')
  }
}
