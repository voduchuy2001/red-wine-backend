/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'ModelHasRoles',
      [
        {
          roleId: 1,
          modelType: 'User',
          modelId: 1
        },
        {
          roleId: 2,
          modelType: 'User',
          modelId: 2
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ModelHasRoles', null, {})
  }
}
