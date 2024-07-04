import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {}
  }
  Role.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Role'
    }
  )
  return Role
}
