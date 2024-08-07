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

    await queryInterface.createTable('ProductVariants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      productId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      salePrice: {
        type: Sequelize.DECIMAL(12, 2)
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
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

    await queryInterface.createTable('OptionValues', {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    await queryInterface.createTable('VariantOptions', {
      variantId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'ProductVariants',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      optionValueId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'OptionValues',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })

    await queryInterface.createTable('ProductCategories', {
      productId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      categoryId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })

    await queryInterface.createTable('Media', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      mediableType: {
        type: Sequelize.STRING
      },
      mediableId: {
        type: Sequelize.BIGINT
      },
      type: {
        type: Sequelize.STRING
      },
      mimeType: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      alt: {
        type: Sequelize.STRING
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

    await queryInterface.addIndex('Products', ['sku'])
    await queryInterface.addIndex('Categories', ['parentId'])
    await queryInterface.addIndex('ProductVariants', ['productId'])
    await queryInterface.addIndex('VariantOptions', ['variantId', 'optionValueId'])
    await queryInterface.addIndex('ProductCategories', ['productId', 'categoryId'])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Brands')
    await queryInterface.dropTable('VariantOptions')
    await queryInterface.dropTable('OptionValues')
    await queryInterface.dropTable('ProductVariants')
    await queryInterface.dropTable('Products')
    await queryInterface.dropTable('Categories')
    await queryInterface.dropTable('Media')
    await queryInterface.dropTable('ProductCategories')
  }
}
