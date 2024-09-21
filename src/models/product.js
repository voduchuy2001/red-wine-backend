'use strict'
import { Model } from 'sequelize'

class Product extends Model {
  static associate({ Brand, Category, Media }) {
    this.belongsTo(Brand, { foreignKey: 'brandId', as: 'brand' })

    this.belongsToMany(Category, { foreignKey: 'productId', through: 'ProductCategories', as: 'categories' })

    this.hasMany(Media, {
      foreignKey: 'mediableId',
      constraints: false,
      scope: { mediableType: 'product' },
      as: 'media'
    })
  }
}

export default (sequelize, { BIGINT, DECIMAL, INTEGER, STRING, TEXT, TINYINT }) => {
  Product.init(
    {
      brandId: BIGINT,
      name: STRING,
      status: STRING,
      description: TEXT,
      sku: STRING,
      quantity: INTEGER,
      order: TINYINT,
      price: DECIMAL,
      salePrice: DECIMAL
    },
    {
      sequelize,
      modelName: 'Product'
    }
  )
  return Product
}
