'use strict'

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tạo mẫu cho bảng Brands
    const brands = []
    for (let i = 0; i < 10; i++) {
      brands.push({
        name: faker.company.name(),
        website: faker.internet.url(),
        description: faker.lorem.paragraph(),
        status: 'active',
        featured: faker.datatype.boolean() ? 1 : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Brands', brands, {})

    // Tạo mẫu cho bảng Categories
    const categories = []
    for (let i = 0; i < 10; i++) {
      categories.push({
        parentId: null,
        name: faker.commerce.department(),
        status: 'active',
        featured: faker.datatype.boolean() ? 1 : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Categories', categories, {})

    // Tạo mẫu cho bảng Products
    const products = []
    for (let i = 0; i < 50; i++) {
      products.push({
        brandId: faker.datatype.number({ min: 1, max: 10 }),
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        featured: faker.datatype.boolean() ? 1 : 0,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Products', products, {})

    // Tạo mẫu cho bảng Variants
    const variants = []
    for (let i = 0; i < 50; i++) {
      variants.push({
        productId: faker.datatype.number({ min: 1, max: 50 }),
        sku: faker.datatype.string(10),
        price: faker.commerce.price(),
        quantity: faker.datatype.number({ min: 1, max: 100 }),
        isDefault: faker.datatype.boolean() ? 1 : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Variants', variants, {})

    // Tạo mẫu cho bảng Options
    const options = []
    const optionNames = ['Color', 'Size', 'Material', 'Weight']
    for (const name of optionNames) {
      options.push({
        name: name,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Options', options, {})

    // Tạo mẫu cho bảng OptionValues
    const optionValues = []
    const optionValuesData = {
      Color: ['Red', 'Green', 'Blue', 'Black', 'White'],
      Size: ['Small', 'Medium', 'Large', 'X-Large'],
      Material: ['Cotton', 'Polyester', 'Wool', 'Leather'],
      Weight: ['0.5kg', '1kg', '1.5kg', '2kg']
    }

    for (const [optionName, values] of Object.entries(optionValuesData)) {
      const option = await queryInterface.sequelize.query(`SELECT id FROM Options WHERE name = :name`, {
        replacements: { name: optionName },
        type: Sequelize.QueryTypes.SELECT
      })
      const optionId = option[0].id

      for (const value of values) {
        optionValues.push({
          optionId: optionId,
          value: value,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }
    await queryInterface.bulkInsert('OptionValues', optionValues, {})

    // Tạo mẫu cho bảng VariantOptions
    const variantOptions = []
    for (let i = 0; i < 50; i++) {
      const variantId = faker.datatype.number({ min: 1, max: 50 })
      const optionId = faker.datatype.number({ min: 1, max: 4 }) // Assuming there are 4 options
      const optionValue = await queryInterface.sequelize.query(
        `SELECT id FROM OptionValues WHERE optionId = :optionId ORDER BY RAND() LIMIT 1`,
        { replacements: { optionId: optionId }, type: Sequelize.QueryTypes.SELECT }
      )
      const optionValueId = optionValue[0].id

      variantOptions.push({
        variantId: variantId,
        optionValueId: optionValueId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('VariantOptions', variantOptions, {})

    // Tạo mẫu cho bảng ProductCategories
    const productCategories = []
    for (let i = 0; i < 50; i++) {
      productCategories.push({
        productId: faker.datatype.number({ min: 1, max: 50 }),
        categoryId: faker.datatype.number({ min: 1, max: 10 })
      })
    }
    await queryInterface.bulkInsert('ProductCategories', productCategories, {})

    // Tạo mẫu cho bảng Media
    const media = []
    for (let i = 0; i < 100; i++) {
      media.push({
        mediable: 'Product',
        mediableId: faker.datatype.number({ min: 1, max: 50 }),
        type: 'image',
        mimeType: 'image/jpeg',
        size: faker.datatype.number({ min: 1000, max: 10000 }),
        url: faker.image.imageUrl(),
        alt: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Media', media, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Products', null, {})
    await queryInterface.bulkDelete('Variants', null, {})
    await queryInterface.bulkDelete('Options', null, {})
    await queryInterface.bulkDelete('OptionValues', null, {})
    await queryInterface.bulkDelete('VariantOptions', null, {})
    await queryInterface.bulkDelete('ProductCategories', null, {})
    await queryInterface.bulkDelete('Media', null, {})
  }
}
