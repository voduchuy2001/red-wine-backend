'use strict'
import { Model } from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {}
  }
  Permission.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Permission'
    }
  )
  return Permission
}
