/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date()

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          avatar: 'https://ui-avatars.com/api/?name=A&size=200&background=800000&color=fff&bold=true',
          name: 'Vo Duc Huy',
          email: 'admin@gmail.com',
          password: '$2a$10$q/y4FAdejRsWOxyq5zzt/./1dO9LkQY0P0/t94d3vI1FnluJwm7ke', // admin123
          lastLoginAt: timestamp,
          emailVerifiedAt: timestamp,
          dob: new Date('2001-01-01'),
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          avatar: 'https://ui-avatars.com/api/?name=A&size=200&background=800000&color=fff&bold=true',
          name: 'Jane Smith',
          email: 'staff@example.com',
          password: '$2a$10$q/y4FAdejRsWOxyq5zzt/./1dO9LkQY0P0/t94d3vI1FnluJwm7ke', // admin123
          lastLoginAt: timestamp,
          emailVerifiedAt: timestamp,
          dob: new Date('2000-05-05'),
          createdAt: timestamp,
          updatedAt: timestamp
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
