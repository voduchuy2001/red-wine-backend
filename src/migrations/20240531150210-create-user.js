/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      avatar: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(120),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING
      },
      lastLoginAt: {
        type: Sequelize.DATE
      },
      emailVerifiedAt: {
        type: Sequelize.DATE
      },
      dob: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
}
