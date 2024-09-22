/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'RoleHasPermissions',
      [
        {
          roleId: 1,
          permissionId: 1
        },
        {
          roleId: 1,
          permissionId: 2
        },
        {
          roleId: 1,
          permissionId: 3
        },
        {
          roleId: 1,
          permissionId: 4
        },
        {
          roleId: 1,
          permissionId: 5
        },
        {
          roleId: 1,
          permissionId: 6
        },
        {
          roleId: 1,
          permissionId: 7
        },
        {
          roleId: 1,
          permissionId: 8
        },
        {
          roleId: 1,
          permissionId: 9
        },
        {
          roleId: 1,
          permissionId: 10
        },
        {
          roleId: 1,
          permissionId: 11
        },
        {
          roleId: 1,
          permissionId: 12
        },
        {
          roleId: 1,
          permissionId: 13
        },
        {
          roleId: 1,
          permissionId: 14
        },
        {
          roleId: 2,
          permissionId: 1
        },
        {
          roleId: 2,
          permissionId: 5
        },
        {
          roleId: 2,
          permissionId: 6
        },
        {
          roleId: 2,
          permissionId: 9
        },
        {
          roleId: 2,
          permissionId: 10
        },
        {
          roleId: 2,
          permissionId: 13
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RoleHasPermissions', null, {})
  }
}
