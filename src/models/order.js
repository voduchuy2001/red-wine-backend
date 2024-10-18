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

export default (sequelize, { BIGINT, DECIMAL, STRING }) => {
  Order.init(
    {
      customerId: BIGINT,
      userId: BIGINT,
      code: STRING,
      status: STRING,
      total: DECIMAL
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'Orders'
    }
  )
  return Order
}
