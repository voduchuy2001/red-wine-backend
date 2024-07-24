'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VariantOptions', {
      variantId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Variants',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      optionValueId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'OptionValues',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VariantOptions')
  }
}
