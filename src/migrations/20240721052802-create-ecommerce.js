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
        type: Sequelize.STRING
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
        type: Sequelize.STRING
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
      content: {
        type: Sequelize.TEXT('long')
      },
      description: {
        type: Sequelize.TEXT
      },
      featured: {
        type: Sequelize.TINYINT
      },
      status: {
        type: Sequelize.STRING
      },
      sku: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      order: {
        type: Sequelize.TINYINT
      },
      price: {
        type: Sequelize.DECIMAL(12, 2)
      },
      salePrice: {
        type: Sequelize.DECIMAL(12, 2)
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

    await queryInterface.createTable('Variants', {
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
      sku: {
        type: Sequelize.STRING(120),
        allowNull: false
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

    await queryInterface.createTable('ProductOptions', {
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

    await queryInterface.createTable('OptionValues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      optionId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'ProductOptions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      value: {
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
          model: 'Variants',
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
      mediable: {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Brands')
    await queryInterface.dropTable('VariantOptions')
    await queryInterface.dropTable('OptionValues')
    await queryInterface.dropTable('ProductOptions')
    await queryInterface.dropTable('Products')
    await queryInterface.dropTable('Categories')
    await queryInterface.dropTable('Brands')
    await queryInterface.dropTable('Media')
    await queryInterface.dropTable('ProductCategories')
  }
}
