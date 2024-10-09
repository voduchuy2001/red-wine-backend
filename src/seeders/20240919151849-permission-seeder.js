/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date()

    await queryInterface.bulkInsert(
      'Permissions',
      [
        {
          name: 'View Products',
          code: 'view.products',
          description: 'Permission to view products',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Add Products',
          code: 'add.products',
          description: 'Permission to add new products',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Edit Products',
          code: 'edit.products',
          description: 'Permission to edit existing products',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Delete Products',
          code: 'delete.products',
          description: 'Permission to delete products',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Add Orders',
          code: 'add.orders',
          description: 'Permission to add new orders',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'View Orders',
          code: 'view.orders',
          description: 'Permission to view orders',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Update Orders',
          code: 'update.orders',
          description: 'Permission to update orders status',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Delete Orders',
          code: 'delete.orders',
          description: 'Permission to delete orders',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'View Users',
          code: 'view.users',
          description: 'Permission to view users',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Add Users',
          code: 'add.users',
          description: 'Permission to add new users',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Edit Users',
          code: 'edit.users',
          description: 'Permission to edit user details',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Delete Users',
          code: 'delete.users',
          description: 'Permission to delete users',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'View Roles',
          code: 'view.roles',
          description: 'Permission to view roles',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Add Roles',
          code: 'add.roles',
          description: 'Permission to add new roles',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Edit Roles',
          code: 'edit.roles',
          description: 'Permission to edit roles',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Delete Roles',
          code: 'delete.roles',
          description: 'Permission to delete roles',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Manage Settings',
          code: 'manage.settings',
          description: 'Permission to manage system settings',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'View Reports',
          code: 'view.reports',
          description: 'Permission to view system reports',
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          name: 'Manage Discounts',
          code: 'manage.discounts',
          description: 'Permission to manage discount codes and offers',
          createdAt: timestamp,
          updatedAt: timestamp
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {})
  }
}
