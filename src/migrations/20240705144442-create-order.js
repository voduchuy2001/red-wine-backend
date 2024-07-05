'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: 'Users',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      code: {
        type: Sequelize.STRING(200),
        unique: true,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(120)
      },
      subTotal: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      taxAmount: {
        type: Sequelize.DECIMAL(15, 2)
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2)
      },
      shippingAmount: {
        type: Sequelize.DECIMAL(15, 2)
      },
      note: {
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
    await queryInterface.dropTable('Orders')
  }
}
