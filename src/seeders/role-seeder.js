/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date()

    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'Admin',
          code: 'admin',
          description: 'Administrator with full access',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'User',
          code: 'user',
          description: 'Regular user with limited access',
          createdAt: timestamp,
          updatedAt: timestamp
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
