'use strict'
const { Model } = require('sequelize')

export default (sequelize, DataTypes) => {
  class ProductPrice extends Model {
    static associate(models) {}
  }
  ProductPrice.init(
    {
      productId: DataTypes.BIGINT,
      variantOptionId: DataTypes.BIGINT,
      regularPrice: DataTypes.DECIMAL,
      salePrice: DataTypes.DECIMAL,
      wholesalePrice: DataTypes.DECIMAL
    },
    {
      sequelize,
      modelName: 'ProductPrice'
    }
  )
  return ProductPrice
}
