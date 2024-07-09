'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class ProductReview extends Model {
    static associate(models) {}
  }
  ProductReview.init(
    {
      customerId: DataTypes.BIGINT,
      productId: DataTypes.BIGINT,
      star: DataTypes.DOUBLE,
      comment: DataTypes.TEXT,
      status: DataTypes.STRING,
      images: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'ProductReview'
    }
  )
  return ProductReview
}
