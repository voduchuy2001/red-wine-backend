import { Model } from 'sequelize'

class PasswordResetToken extends Model {
  static associate(models) {}
}

export default (sequelize, { STRING }) => {
  PasswordResetToken.init(
    {
      email: STRING,
      token: STRING
    },
    {
      sequelize,
      modelName: 'PasswordResetToken',
      updatedAt: false
    }
  )
  return PasswordResetToken
}
