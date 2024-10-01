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

export default (sequelize, DataTypes) => {
  FlashSale.init(
    {
      name: DataTypes.STRING,
      endDate: DataTypes.DATE,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'FlashSale',
      tableName: 'FlashSales'
    }
  )
  return FlashSale
}
