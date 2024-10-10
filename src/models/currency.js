'use strict'

import { Model } from 'sequelize'

class Currency extends Model {
  static associate(models) {}
}

export default (sequelize, { DOUBLE, STRING, TINYINT }) => {
  Currency.init(
    {
      title: STRING,
      symbol: STRING,
      isPrefixSymbol: TINYINT,
      decimals: TINYINT,
      isDefault: TINYINT,
      exchangeRate: DOUBLE
    },
    {
      sequelize,
      modelName: 'Currency',
      tableName: 'Currencies'
    }
  )
  return Currency
}
