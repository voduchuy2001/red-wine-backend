const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date()
    const hashedPassword = await bcrypt.hashSync('admin123')

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          avatar: 'https://ui-avatars.com/api/?name=A&size=200&background=800000&color=fff&bold=true',
          name: 'Vo Duc Huy',
          username: 'admin',
          email: 'admin@gmail.com',
          password: hashedPassword, // admin123
          lastLoginAt: timestamp,
          emailVerifiedAt: timestamp,
          dob: new Date('2001-01-01'),
          createdAt: timestamp,
          updatedAt: timestamp
        },
        {
          avatar: 'https://ui-avatars.com/api/?name=A&size=200&background=800000&color=fff&bold=true',
          name: 'Jane Smith',
          username: 'staff',
          email: 'staff@example.com',
          password: hashedPassword,
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
