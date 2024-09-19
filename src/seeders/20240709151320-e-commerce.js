'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert Brands
    await queryInterface.bulkInsert('Brands', [
      { name: 'Apple', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Samsung', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Nike', createdAt: new Date(), updatedAt: new Date() }
    ])

    // Retrieve Brands
    const brands = await queryInterface.sequelize.query('SELECT * FROM `Brands`', { type: Sequelize.QueryTypes.SELECT })

    // Insert Categories
    await queryInterface.bulkInsert('Categories', [
      { name: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Clothing', createdAt: new Date(), updatedAt: new Date() }
    ])

    // Retrieve Categories
    const categories = await queryInterface.sequelize.query('SELECT * FROM `Categories`', {
      type: Sequelize.QueryTypes.SELECT
    })

    // Insert Products
    await queryInterface.bulkInsert('Products', [
      {
        name: 'iPhone 15 Pro Max',
        brandId: brands.find((b) => b.name === 'Apple').id,
        description: 'The latest iPhone model with advanced features.',
        status: 'published',
        sku: 'IP15PM128BLK',
        price: 30000000,
        salePrice: 0,
        quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy S22 Ultra',
        brandId: brands.find((b) => b.name === 'Samsung').id,
        description: 'Flagship smartphone with powerful camera and performance.',
        status: 'published',
        sku: 'SGS22UL512GRY',
        price: 25000000,
        salePrice: 0,
        quantity: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nike Air Zoom Pegasus 38',
        brandId: brands.find((b) => b.name === 'Nike').id,
        description: 'Running shoes with responsive cushioning for long-distance runs.',
        status: 'published',
        sku: 'NAZP38BLK',
        price: 1500000,
        salePrice: 0,
        quantity: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    // Retrieve Products
    const products = await queryInterface.sequelize.query('SELECT * FROM `Products`', {
      type: Sequelize.QueryTypes.SELECT
    })

    // Insert ProductVariants
    await queryInterface.bulkInsert('ProductVariants', [
      {
        productId: products.find((p) => p.name === 'iPhone 15 Pro Max').id,
        price: 30000000,
        salePrice: 0,
        quantity: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: products.find((p) => p.name === 'Samsung Galaxy S22 Ultra').id,
        price: 25000000,
        salePrice: 0,
        quantity: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: products.find((p) => p.name === 'Nike Air Zoom Pegasus 38').id,
        price: 1500000,
        salePrice: 0,
        quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    // Retrieve ProductVariants
    const productVariants = await queryInterface.sequelize.query('SELECT * FROM `ProductVariants`', {
      type: Sequelize.QueryTypes.SELECT
    })

    // Insert OptionValues
    await queryInterface.bulkInsert('OptionValues', [
      { name: '128GB', createdAt: new Date(), updatedAt: new Date() },
      { name: '256GB', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Black', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gray', createdAt: new Date(), updatedAt: new Date() },
      { name: 'White', createdAt: new Date(), updatedAt: new Date() }
    ])

    // Retrieve OptionValues
    const optionValues = await queryInterface.sequelize.query('SELECT * FROM `OptionValues`', {
      type: Sequelize.QueryTypes.SELECT
    })

    // Insert VariantOptions
    await queryInterface.bulkInsert('VariantOptions', [
      {
        variantId: productVariants.find((v) => v.productId === products.find((p) => p.name === 'iPhone 15 Pro Max').id)
          .id,
        optionValueId: optionValues.find((o) => o.name === '128GB').id
      },
      {
        variantId: productVariants.find((v) => v.productId === products.find((p) => p.name === 'iPhone 15 Pro Max').id)
          .id,
        optionValueId: optionValues.find((o) => o.name === 'Black').id
      },
      {
        variantId: productVariants.find(
          (v) => v.productId === products.find((p) => p.name === 'Samsung Galaxy S22 Ultra').id
        ).id,
        optionValueId: optionValues.find((o) => o.name === '256GB').id
      },
      {
        variantId: productVariants.find(
          (v) => v.productId === products.find((p) => p.name === 'Samsung Galaxy S22 Ultra').id
        ).id,
        optionValueId: optionValues.find((o) => o.name === 'Gray').id
      },
      {
        variantId: productVariants.find(
          (v) => v.productId === products.find((p) => p.name === 'Nike Air Zoom Pegasus 38').id
        ).id,
        optionValueId: optionValues.find((o) => o.name === 'White').id
      }
    ])

    // Insert ProductCategory
    await queryInterface.bulkInsert('ProductCategory', [
      {
        productId: products.find((p) => p.name === 'iPhone 15 Pro Max').id,
        categoryId: categories.find((c) => c.name === 'Electronics').id
      },
      {
        productId: products.find((p) => p.name === 'Samsung Galaxy S22 Ultra').id,
        categoryId: categories.find((c) => c.name === 'Electronics').id
      },
      {
        productId: products.find((p) => p.name === 'Nike Air Zoom Pegasus 38').id,
        categoryId: categories.find((c) => c.name === 'Clothing').id
      }
    ])

    // Insert Media
    await queryInterface.bulkInsert('Media', [
      {
        mediableType: 'product',
        mediableId: products.find((p) => p.name === 'iPhone 15 Pro Max').id,
        type: 'image',
        mimeType: 'image/jpeg',
        size: 1024,
        url: faker.image.urlLoremFlickr({ category: 'fashion' }),
        alt: 'iPhone 15 Pro Max',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mediableType: 'product',
        mediableId: products.find((p) => p.name === 'Samsung Galaxy S22 Ultra').id,
        type: 'image',
        mimeType: 'image/jpeg',
        size: 1024,
        url: faker.image.url(),
        alt: 'Samsung Galaxy S22 Ultra',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mediableType: 'product',
        mediableId: products.find((p) => p.name === 'Nike Air Zoom Pegasus 38').id,
        type: 'image',
        mimeType: 'image/jpeg',
        size: 1024,
        url: faker.image.url(),
        alt: 'Nike Air Zoom Pegasus 38',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Media', null, {})
    await queryInterface.bulkDelete('ProductCategory', null, {})
    await queryInterface.bulkDelete('VariantOptions', null, {})
    await queryInterface.bulkDelete('OptionValues', null, {})
    await queryInterface.bulkDelete('ProductVariants', null, {})
    await queryInterface.bulkDelete('Products', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Brands', null, {})
  }
}
