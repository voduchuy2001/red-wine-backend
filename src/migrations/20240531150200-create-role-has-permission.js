/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoleHasPermissions', {
      roleId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      permissionId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Permissions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RoleHasPermissions')
  }
}
