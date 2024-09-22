'use strict'

import { Model } from 'sequelize'

class AttributeOption extends Model {
  static associate({ Attribute, SKU }) {
    this.belongsTo(Attribute, {
      foreignKey: 'attributeId',
      as: 'attribute'
    })

    this.belongsToMany(SKU, {
      foreignKey: 'attributeOptionId',
      otherKey: 'skuId',
      through: {
        model: 'AttributeOptionSKUs'
      },
      as: 'skus'
    })
  }
}

export default (sequelize, { BIGINT, INTEGER, STRING }) => {
  AttributeOption.init(
    {
      attributeId: BIGINT,
      value: STRING,
      order: INTEGER
    },
    {
      sequelize,
      modelName: 'AttributeOption',
      tableName: 'AttributeOptions'
    }
  )
  return AttributeOption
}
