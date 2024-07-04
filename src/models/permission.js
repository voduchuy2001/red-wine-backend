import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
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
