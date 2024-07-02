'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      content: {
        type: Sequelize.TEXT('long')
      },
      status: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.TEXT
      },
      order: {
        type: Sequelize.INTEGER
      },
      isFeatured: {
        type: Sequelize.TINYINT
      },
      price: {
        type: Sequelize.DOUBLE
      },
      salePrice: {
        type: Sequelize.DOUBLE
      },
      length: {
        type: Sequelize.FLOAT
      },
      width: {
        type: Sequelize.FLOAT
      },
      height: {
        type: Sequelize.FLOAT
      },
      weight: {
        type: Sequelize.FLOAT
      },
      barcode: {
        type: Sequelize.STRING
      },
      views: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('Products')
  }
}
