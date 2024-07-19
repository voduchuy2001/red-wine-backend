import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: {
          model: models.ModelHasRole,
          scope: {
            modelType: 'user'
          }
        },
        foreignKey: 'modelId',
        as: 'users'
      })

      this.belongsToMany(models.Permission, {
        through: models.RoleHasPermission,
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
