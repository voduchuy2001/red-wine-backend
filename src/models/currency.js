'use strict'

import { Model } from 'sequelize'

class Currency extends Model {
  static associate(models) {}
}

export default (sequelize, DataTypes) => {
  Currency.init(
    {
      title: DataTypes.STRING,
      symbol: DataTypes.STRING,
      isPrefixSymbol: DataTypes.TINYINT,
      decimals: DataTypes.TINYINT,
      isDefault: DataTypes.TINYINT,
      exchangeRate: DataTypes.DOUBLE
    },
    {
      sequelize,
      modelName: 'Currency',
      tableName: 'Currencies'
    }
  )
  return Currency
}
