'use strict'

import { Model } from 'sequelize'

class PasswordResetToken extends Model {
  static associate({ User }) {
    this.belongsTo(User, {
      foreignKey: 'email',
      as: 'user'
    })
  }
}

export default (sequelize, { STRING, BIGINT }) => {
  PasswordResetToken.init(
    {
      modelable: STRING,
      modelableId: BIGINT,
      token: STRING
    },
    {
      sequelize,
      modelName: 'PasswordResetToken',
      tableName: 'PasswordResetTokens',
      updatedAt: false
    }
  )
  return PasswordResetToken
}
