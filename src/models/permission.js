import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      const { Role, RoleHasPermission, ModelHasPermission, User } = models

      this.belongsToMany(Role, {
        through: RoleHasPermission,
        foreignKey: 'permissionId',
        otherKey: 'roleId',
        as: 'roles'
      })

      this.belongsToMany(User, {
        through: {
          model: ModelHasPermission,
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
