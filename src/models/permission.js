import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, {
        through: models.RoleHasPermission,
        foreignKey: 'permissionId',
        otherKey: 'roleId',
        as: 'roles'
      })

      this.belongsToMany(models.User, {
        through: {
          model: models.ModelHasPermission,
          scope: {
            modelType: 'user'
          }
        },
        foreignKey: 'permissionId',
        as: 'users'
      })
    }
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
