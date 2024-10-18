'use strict'

import { Model } from 'sequelize'

class Tax extends Model {
  static associate(models) {}
}

export default (sequelize, { DOUBLE, INTEGER, STRING }) => {
  Tax.init(
    {
      title: STRING,
      percentage: DOUBLE,
      priority: INTEGER,
      status: STRING
    },
    {
      sequelize,
      modelName: 'Tax',
      tableName: 'Taxes'
    }
  )
  return Tax
}
