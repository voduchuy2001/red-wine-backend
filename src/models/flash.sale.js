'use strict'

import { Model } from 'sequelize'

class FlashSale extends Model {
  static associate({ Product }) {
    this.belongsToMany(Product, {
      through: 'FlashSaleProducts',
      foreignKey: 'flashSaleId',
      otherKey: 'productId',
      as: 'products'
    })
  }
}

export default (sequelize, { DATE, STRING }) => {
  FlashSale.init(
    {
      name: STRING,
      endDate: DATE,
      status: STRING
    },
    {
      sequelize,
      modelName: 'FlashSale',
      tableName: 'FlashSales'
    }
  )
  return FlashSale
}
