const path = require('path')
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date()
    const locale = process.env.APP_LOCALE ? process.env.APP_LOCALE : 'en'
    const systemPermissionsPath = path.join(__dirname, `../storage/data/${locale}_permission.json`)

    if (!fs.existsSync(systemPermissionsPath)) {
      throw new Error('No systemPermissions found.')
    }

    const permissions = JSON.parse(fs.readFileSync(systemPermissionsPath, 'utf8'))
    const permissionData = permissions.map((permission) => ({
      ...permission,
      createdAt: timestamp,
      updatedAt: timestamp
    }))

    await queryInterface.bulkInsert('Permissions', permissionData)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {})
  }
}
