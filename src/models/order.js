'use strict'

import { Model } from 'sequelize'

class Order extends Model {
  static associate({ OrderItem, OrderHistory, OrderAddress }) {
    this.hasMany(OrderItem, {
      foreignKey: 'orderId',
      as: 'orderItems'
    })

    this.hasMany(OrderHistory, {
      foreignKey: 'orderId',
      as: 'orderHistories'
    })

    this.hasOne(OrderAddress, {
      foreignKey: 'orderId',
      scope: {
        type: 'shipping'
      },
      as: 'shippingAddress'
    })

    this.hasOne(OrderAddress, {
      foreignKey: 'orderId',
      scope: {
        type: 'billing'
      },
      as: 'billingAddress'
    })
  }
}

export default (sequelize, DataTypes) => {
  Order.init(
    {
      customerId: DataTypes.BIGINT,
      userId: DataTypes.BIGINT,
      code: DataTypes.STRING,
      status: DataTypes.STRING,
      total: DataTypes.DECIMAL
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'Orders'
    }
  )
  return Order
}
