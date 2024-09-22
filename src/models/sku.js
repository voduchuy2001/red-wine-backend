'use strict'

import { Model } from 'sequelize'

class SKU extends Model {
  static associate({ Product, AttributeOption }) {
    this.belongsTo(Product, {
      foreignKey: 'productId',
      as: 'product'
    })

    this.belongsToMany(AttributeOption, {
      foreignKey: 'skuId',
      otherKey: 'attributeOptionId',
      through: {
        model: 'AttributeOptionSKUs'
      },
      as: 'attributeOptions'
    })
  }
}

export default (sequelize, { STRING, BIGINT, DECIMAL, INTEGER, BOOLEAN }) => {
  SKU.init(
    {
      productId: BIGINT,
      code: STRING,
      price: DECIMAL,
      salePrice: DECIMAL,
      stock: INTEGER,
      status: STRING,
      isDefault: BOOLEAN
    },
    {
      sequelize,
      modelName: 'SKU',
      tableName: 'SKUs'
    }
  )
  return SKU
}
