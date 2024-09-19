'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Brand, { foreignKey: 'brandId', as: 'brand' })

      this.hasMany(models.ProductVariant, { foreignKey: 'productId', as: 'variants' })

      this.belongsToMany(models.Category, { foreignKey: 'productId', through: 'ProductCategory', as: 'categories' })

      this.hasMany(models.Media, {
        foreignKey: 'mediableId',
        constraints: false,
        scope: { mediableType: 'product' },
        as: 'media'
      })
    }
  }
  Product.init(
    {
      brandId: DataTypes.BIGINT,
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      description: DataTypes.TEXT,
      sku: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      order: DataTypes.TINYINT,
      price: DataTypes.DECIMAL,
      salePrice: DataTypes.DECIMAL
    },
    {
      sequelize,
      modelName: 'Product'
    }
  )
  return Product
}
