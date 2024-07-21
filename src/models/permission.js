import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, {
        through: 'RoleHasPermissions',
        foreignKey: 'permissionId',
        otherKey: 'roleId',
        as: 'roles',
        timestamps: false
      })

      this.belongsToMany(models.User, {
        through: {
          model: 'ModelHasPermissions',
          scope: {
            modelType: 'user'
          }
        },
        foreignKey: 'permissionId',
        as: 'users',
        timestamps: false
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
