'use strict'

import { Model } from 'sequelize'

class Attribute extends Model {
  static associate({ AttributeOption }) {
    this.hasMany(AttributeOption, {
      foreignKey: 'attributeId',
      as: 'attributeOptions'
    })
  }
}

export default (sequelize, { BOOLEAN, STRING, TEXT }) => {
  Attribute.init(
    {
      name: STRING,
      description: TEXT,
      isVisible: BOOLEAN
    },
    {
      sequelize,
      modelName: 'Attribute',
      tableName: 'Attributes'
    }
  )
  return Attribute
}
