'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Brands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      website: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM(['published', 'draft', 'pending'])
      },
      featured: {
        type: Sequelize.TINYINT
      },
      order: {
        type: Sequelize.TINYINT
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

    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      parentId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM(['published', 'draft', 'pending'])
      },
      featured: {
        type: Sequelize.TINYINT
      },
      order: {
        type: Sequelize.TINYINT
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

    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      brandId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Brands',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM(['published', 'draft', 'pending'])
      },
      sku: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(12, 2)
      },
      salePrice: {
        type: Sequelize.DECIMAL(12, 2)
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      order: {
        type: Sequelize.TINYINT
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

    await queryInterface.createTable('SKUs', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT },
      productId: {
        type: Sequelize.BIGINT,
        references: { model: 'Products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      code: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.DOUBLE, allowNull: false },
      stock: { type: Sequelize.INTEGER }, // new field
      status: { type: Sequelize.ENUM(['active', 'inactive']) }, // new field
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })

    await queryInterface.createTable('Attributes', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      isVisible: { type: Sequelize.BOOLEAN },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })

    await queryInterface.createTable('AttributeOptions', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT },
      attributeId: {
        type: Sequelize.BIGINT,
        references: { model: 'Attributes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      value: { type: Sequelize.STRING, allowNull: false },
      isDefault: { type: Sequelize.BOOLEAN },
      order: { type: Sequelize.TINYINT },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })

    await queryInterface.createTable('AttributeOptionSKUs', {
      skuId: {
        type: Sequelize.BIGINT,
        references: { model: 'SKUs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      attributeOptionId: {
        type: Sequelize.BIGINT,
        references: { model: 'AttributeOptions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantity: { type: Sequelize.INTEGER }
    })

    await queryInterface.createTable('Media', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT },
      mediableType: { type: Sequelize.STRING },
      mediableId: { type: Sequelize.BIGINT },
      url: { type: Sequelize.STRING, allowNull: false },
      type: { type: Sequelize.STRING }, // new field
      altText: { type: Sequelize.STRING }, // new field
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AttributeOptionSKUs')
    await queryInterface.dropTable('AttributeOptions')
    await queryInterface.dropTable('Attributes')
    await queryInterface.dropTable('SKUs')
    await queryInterface.dropTable('Products')
    await queryInterface.dropTable('Brands')
    await queryInterface.dropTable('ProductCategories')
    await queryInterface.dropTable('Categories')
    await queryInterface.dropTable('Media')
  }
}
