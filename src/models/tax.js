'use strict'

import { Model } from 'sequelize'

class Tax extends Model {
  static associate(models) {}
}

export default (sequelize, DataTypes) => {
  Tax.init(
    {
      title: DataTypes.STRING,
      percentage: DataTypes.DOUBLE,
      priority: DataTypes.INTEGER,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Tax',
      tableName: 'Taxes'
    }
  )
  return Tax
}
