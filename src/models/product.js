'use strict'

import { Model } from 'sequelize'

class Product extends Model {
  static associate({ Brand, Category, Media, SKU, FlashSale }) {
    this.belongsTo(Brand, {
      foreignKey: 'brandId',
      as: 'brand'
    })

    this.belongsToMany(Category, {
      foreignKey: 'productId',
      through: 'ProductCategories',
      as: 'categories'
    })

    this.hasMany(Media, {
      foreignKey: 'mediableId',
      constraints: false,
      scope: {
        mediableType: 'Product'
      },
      as: 'media'
    })

    this.hasMany(SKU, {
      foreignKey: 'productId',
      as: 'skus'
    })

    this.belongsToMany(FlashSale, {
      through: 'FlashSaleProducts',
      foreignKey: 'productId',
      otherKey: 'flashSaleId',
      as: 'flashSales'
    })
  }
}

export default (sequelize, { BIGINT, DECIMAL, INTEGER, STRING, TEXT }) => {
  Product.init(
    {
      brandId: BIGINT,
      name: STRING,
      code: STRING,
      description: TEXT,
      status: STRING,
      price: DECIMAL,
      salePrice: DECIMAL,
      quantity: INTEGER,
      order: INTEGER
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'Products'
    }
  )
  return Product
}
