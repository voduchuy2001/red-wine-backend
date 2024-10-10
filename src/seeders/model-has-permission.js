/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'ModelHasPermissions',
      [
        {
          permissionId: 1,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 2,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 3,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 4,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 5,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 6,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 7,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 8,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 9,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 10,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 11,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 12,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 13,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 14,
          modelType: 'User',
          modelId: 1
        },
        {
          permissionId: 1,
          modelType: 'User',
          modelId: 2
        },
        {
          permissionId: 5,
          modelType: 'User',
          modelId: 2
        },
        {
          permissionId: 6,
          modelType: 'User',
          modelId: 2
        },
        {
          permissionId: 9,
          modelType: 'User',
          modelId: 2
        },
        {
          permissionId: 10,
          modelType: 'User',
          modelId: 2
        },
        {
          permissionId: 13,
          modelType: 'User',
          modelId: 2
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ModelHasPermissions', null, {})
  }
}
