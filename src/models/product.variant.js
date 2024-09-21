'use strict'
import { Model } from 'sequelize'

class ProductVariant extends Model {
  static associate({ OptionValue, Product }) {
    this.belongsTo(Product, { foreignKey: 'productId', as: 'product' })

    ProductVariant.belongsToMany(OptionValue, {
      through: 'VariantOptions',
      as: 'options',
      foreignKey: 'variantId'
    })
  }
}

export default (sequelize, { BIGINT, DECIMAL, INTEGER }) => {
  ProductVariant.init(
    {
      productId: BIGINT,
      price: DECIMAL,
      salePrice: DECIMAL,
      quantity: INTEGER
    },
    {
      sequelize,
      modelName: 'ProductVariant'
    }
  )
  return ProductVariant
}
