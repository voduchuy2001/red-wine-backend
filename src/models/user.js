'use strict'
import SequelizePaginate from '@utils/paginate'
import { Model } from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      avatar: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      lastLoginAt: DataTypes.DATE,
      emailVerifiedAt: DataTypes.DATE,
      dob: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  SequelizePaginate.paginate(User)
  return User
}
