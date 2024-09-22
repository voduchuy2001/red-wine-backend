/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Permissions',
      [
        {
          parentId: null,
          name: 'View Products',
          code: 'view.products',
          description: 'Permission to view products',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Add Products',
          code: 'add.products',
          description: 'Permission to add new products',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Edit Products',
          code: 'edit.products',
          description: 'Permission to edit existing products',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Delete Products',
          code: 'delete.products',
          description: 'Permission to delete products',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Add Orders',
          code: 'add.orders',
          description: 'Permission to add new orders',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'View Orders',
          code: 'view.orders',
          description: 'Permission to view orders',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Update Orders',
          code: 'update.orders',
          description: 'Permission to update orders status',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Delete Orders',
          code: 'delete.orders',
          description: 'Permission to delete orders',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'View Users',
          code: 'view.users',
          description: 'Permission to view users',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Add Users',
          code: 'add.users',
          description: 'Permission to add new users',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Edit Users',
          code: 'edit.users',
          description: 'Permission to edit user details',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Delete Users',
          code: 'delete.users',
          description: 'Permission to delete users',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'View Roles',
          code: 'view.roles',
          description: 'Permission to view roles',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Add Roles',
          code: 'add.roles',
          description: 'Permission to add new roles',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Edit Roles',
          code: 'edit.roles',
          description: 'Permission to edit roles',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Delete Roles',
          code: 'delete.roles',
          description: 'Permission to delete roles',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Manage Settings',
          code: 'manage.settings',
          description: 'Permission to manage system settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'View Reports',
          code: 'view.reports',
          description: 'Permission to view system reports',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          parentId: null,
          name: 'Manage Discounts',
          code: 'manage.discounts',
          description: 'Permission to manage discount codes and offers',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {})
  }
}
