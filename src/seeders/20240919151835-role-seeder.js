/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'Admin',
          code: 'admin',
          description: 'Administrator with full access',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'User',
          code: 'user',
          description: 'Regular user with limited access',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
