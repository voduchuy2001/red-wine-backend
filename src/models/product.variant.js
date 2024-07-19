'use strict'
const { Model } = require('sequelize')

export default (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {}
  }
  ProductVariant.init(
    {
      productId: DataTypes.BIGINT,
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ProductVariant'
    }
  )
  return ProductVariant
}
