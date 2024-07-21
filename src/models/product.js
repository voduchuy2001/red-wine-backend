'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {}
  }
  Product.init(
    {
      brandId: DataTypes.BIGINT,
      name: DataTypes.STRING,
      featured: DataTypes.TINYINT,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Product'
    }
  )
  return Product
}
