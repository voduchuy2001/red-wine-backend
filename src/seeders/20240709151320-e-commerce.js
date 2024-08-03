'use strict'

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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

    const products = []
    for (let i = 0; i < 50; i++) {
      products.push({
        brandId: faker.number.int({ min: 1, max: 10 }),
        name: faker.commerce.productName(),
        content: faker.lorem.paragraph(),
        description: faker.lorem.sentences(3),
        status: 'active',
        sku: faker.string.uuid(),
        quantity: faker.number.int({ min: 1, max: 100 }),
        price: parseFloat(faker.commerce.price({})),
        salePrice: parseFloat(faker.commerce.price({})),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Products', products, {})

    const variants = []
    for (let i = 0; i < 150; i++) {
      variants.push({
        productId: faker.number.int({ min: 1, max: 50 }),
        sku: faker.string.sample(10),
        price: faker.commerce.price({}),
        quantity: faker.number.int({ min: 1, max: 100 }),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Variants', variants, {})

    const productOptions = []
    const optionNames = ['Color', 'Size', 'Material', 'Weight']
    for (const name of optionNames) {
      productOptions.push({
        name: name,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('ProductOptions', productOptions, {})

    const optionValues = []
    const optionValuesData = {
      Color: ['Red', 'Green', 'Blue', 'Black', 'White'],
      Size: ['Small', 'Medium', 'Large', 'X-Large'],
      Material: ['Cotton', 'Polyester', 'Wool', 'Leather'],
      Weight: ['0.5kg', '1kg', '1.5kg', '2kg']
    }

    for (const [optionName, values] of Object.entries(optionValuesData)) {
      const option = await queryInterface.sequelize.query(`SELECT id FROM ProductOptions WHERE name = :name`, {
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

    const variantOptions = []
    for (let i = 0; i < 150; i++) {
      const variantId = faker.number.int({ min: 1, max: 150 })
      const optionId = faker.number.int({ min: 1, max: 4 })
      const optionValue = await queryInterface.sequelize.query(
        `SELECT id FROM OptionValues WHERE optionId = :optionId ORDER BY RAND() LIMIT 1`,
        { replacements: { optionId: optionId }, type: Sequelize.QueryTypes.SELECT }
      )
      const optionValueId = optionValue[0].id

      variantOptions.push({
        variantId: variantId,
        optionValueId: optionValueId
      })
    }
    await queryInterface.bulkInsert('VariantOptions', variantOptions, {})

    const productCategories = []
    for (let i = 0; i < 50; i++) {
      productCategories.push({
        productId: faker.number.int({ min: 1, max: 50 }),
        categoryId: faker.number.int({ min: 1, max: 10 })
      })
    }
    await queryInterface.bulkInsert('ProductCategories', productCategories, {})

    const media = []
    for (let i = 0; i < 100; i++) {
      media.push({
        mediable: 'Product',
        mediableId: faker.number.int({ min: 1, max: 50 }),
        type: 'image',
        mimeType: 'image/jpeg',
        size: faker.number.int({ min: 1000, max: 10000 }),
        url: faker.image.url(),
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
    await queryInterface.bulkDelete('ProductOptions', null, {})
    await queryInterface.bulkDelete('OptionValues', null, {})
    await queryInterface.bulkDelete('VariantOptions', null, {})
    await queryInterface.bulkDelete('ProductCategories', null, {})
    await queryInterface.bulkDelete('Media', null, {})
  }
}
