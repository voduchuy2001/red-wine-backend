'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Brand, { foreignKey: 'brandId', as: 'brand' })

      this.belongsToMany(models.Category, {
        through: 'ProductCategories',
        foreignKey: 'productId',
        as: 'categories',
        timestamps: false
      })

      this.hasMany(models.Variant, { foreignKey: 'productId', as: 'variants' })
    }
  }
  Product.init(
    {
      brandId: DataTypes.BIGINT,
      name: DataTypes.STRING,
      featured: DataTypes.TINYINT,
      status: DataTypes.STRING,
      content: DataTypes.TEXT,
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
