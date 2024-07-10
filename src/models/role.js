import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      const { User, ModelHasRole, Permission, RoleHasPermission } = models

      this.belongsToMany(User, {
        through: {
          model: ModelHasRole,
          scope: {
            modelType: 'user'
          }
        },
        foreignKey: 'modelId',
        as: 'users'
      })

      this.belongsToMany(Permission, {
        through: RoleHasPermission,
        foreignKey: 'roleId',
        otherKey: 'permissionId',
        as: 'permissions'
      })
    }
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
