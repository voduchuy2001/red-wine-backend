'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const settings = [
      {
        key: 'logo',
        value: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'social-links',
        value: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'hotline',
        value: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'address',
        value: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'email',
        value: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'vnpay',
        value: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return await queryInterface.bulkInsert('Settings', settings, {})
  }
}
