/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ModelHasPermissions', {
      permissionId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Permissions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      modelType: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      modelId: {
        type: Sequelize.BIGINT,
        allowNull: false
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ModelHasPermissions')
  }
}
