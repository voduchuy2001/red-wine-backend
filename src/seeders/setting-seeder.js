'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date()

    const settings = [
      {
        key: 'logo',
        value: null,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        key: 'social-links',
        value: null,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        key: 'hotline',
        value: null,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        key: 'address',
        value: null,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        key: 'email',
        value: null,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        key: 'vnpay',
        value: null,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ]

    return await queryInterface.bulkInsert('Settings', settings, {})
  }
}
