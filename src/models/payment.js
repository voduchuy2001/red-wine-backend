'use strict'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {}
  }
  Payment.init(
    {
      currency: DataTypes.STRING,
      userId: DataTypes.BIGINT,
      paymentChannel: DataTypes.STRING,
      note: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      orderId: DataTypes.BIGINT,
      status: DataTypes.STRING,
      paymentType: DataTypes.STRING,
      refundedAmount: DataTypes.DECIMAL,
      refundedNote: DataTypes.STRING,
      customerId: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'Payment'
    }
  )
  return Payment
}
