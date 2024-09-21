'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const brands = [
      { name: 'Nike', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Adidas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Apple', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Samsung', createdAt: new Date(), updatedAt: new Date() }
    ]

    await queryInterface.bulkInsert('Brands', brands)
    const insertedBrands = await queryInterface.sequelize.query(`SELECT * FROM Brands;`)

    const products = [
      {
        brandId: insertedBrands[0][0].id,
        name: 'Nike Air Max',
        description: faker.commerce.productDescription(),
        status: 'published',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brandId: insertedBrands[0][1].id,
        name: 'Adidas Ultraboost',
        description: faker.commerce.productDescription(),
        status: 'published',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brandId: insertedBrands[0][2].id,
        name: 'iPhone 14',
        description: faker.commerce.productDescription(),
        status: 'published',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brandId: insertedBrands[0][3].id,
        name: 'Samsung Galaxy S22',
        description: faker.commerce.productDescription(),
        status: 'published',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('Products', products)
    const insertedProducts = await queryInterface.sequelize.query(`SELECT * FROM Products;`)

    const skus = [
      {
        productId: insertedProducts[0][0].id,
        code: 'SKU-NIKE-001',
        price: 120.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: insertedProducts[0][1].id,
        code: 'SKU-ADIDAS-001',
        price: 150.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: insertedProducts[0][2].id,
        code: 'SKU-APPLE-001',
        price: 999.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: insertedProducts[0][3].id,
        code: 'SKU-SAMSUNG-001',
        price: 899.0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('SKUs', skus)
    const insertedSKUs = await queryInterface.sequelize.query(`SELECT * FROM SKUs;`)

    const attributes = [
      { name: 'Size', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Color', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Storage', createdAt: new Date(), updatedAt: new Date() }
    ]

    await queryInterface.bulkInsert('Attributes', attributes)
    const insertedAttributes = await queryInterface.sequelize.query(`SELECT * FROM Attributes;`)

    const attributeOptions = [
      { attributeId: insertedAttributes[0][0].id, value: 'Small', createdAt: new Date(), updatedAt: new Date() },
      { attributeId: insertedAttributes[0][0].id, value: 'Medium', createdAt: new Date(), updatedAt: new Date() },
      { attributeId: insertedAttributes[0][0].id, value: 'Large', createdAt: new Date(), updatedAt: new Date() },
      { attributeId: insertedAttributes[0][1].id, value: 'Red', createdAt: new Date(), updatedAt: new Date() },
      { attributeId: insertedAttributes[0][1].id, value: 'Blue', createdAt: new Date(), updatedAt: new Date() },
      { attributeId: insertedAttributes[0][1].id, value: 'Black', createdAt: new Date(), updatedAt: new Date() },
      { attributeId: insertedAttributes[0][2].id, value: '64GB', createdAt: new Date(), updatedAt: new Date() },
      { attributeId: insertedAttributes[0][2].id, value: '128GB', createdAt: new Date(), updatedAt: new Date() }
    ]

    await queryInterface.bulkInsert('AttributeOptions', attributeOptions)
    const insertedAttributeOptions = await queryInterface.sequelize.query(`SELECT * FROM AttributeOptions;`)

    await queryInterface.bulkInsert('AttributeOptionSKUs', [
      { skuId: insertedSKUs[0][0].id, attributeOptionId: insertedAttributeOptions[0][2].id }, // Nike Air Max - Size Large
      { skuId: insertedSKUs[0][0].id, attributeOptionId: insertedAttributeOptions[0][3].id }, // Nike Air Max - Color Red
      { skuId: insertedSKUs[0][1].id, attributeOptionId: insertedAttributeOptions[0][1].id }, // Adidas Ultraboost - Size Medium
      { skuId: insertedSKUs[0][1].id, attributeOptionId: insertedAttributeOptions[0][4].id }, // Adidas Ultraboost - Color Blue
      { skuId: insertedSKUs[0][2].id, attributeOptionId: insertedAttributeOptions[0][6].id }, // iPhone 14 - Storage 128GB
      { skuId: insertedSKUs[0][3].id, attributeOptionId: insertedAttributeOptions[0][7].id } // Samsung Galaxy S22 - Storage 128GB
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AttributeOptionSKUs', null, {})
    await queryInterface.bulkDelete('AttributeOptions', null, {})
    await queryInterface.bulkDelete('Attributes', null, {})
    await queryInterface.bulkDelete('SKUs', null, {})
    await queryInterface.bulkDelete('Products', null, {})
    await queryInterface.bulkDelete('Brands', null, {})
  }
}
