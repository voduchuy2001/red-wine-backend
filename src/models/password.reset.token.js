import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class PasswordResetToken extends Model {
    static associate(models) {}
  }
  PasswordResetToken.init(
    {
      email: DataTypes.STRING,
      token: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'PasswordResetToken',
      updatedAt: false
    }
  )
  return PasswordResetToken
}
