import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: {
          model: 'ModelHasRoles',
          scope: {
            modelType: 'user'
          }
        },
        foreignKey: 'modelId',
        as: 'users',
        timestamps: false
      })

      this.belongsToMany(models.Permission, {
        through: 'RoleHasPermissions',
        foreignKey: 'roleId',
        otherKey: 'permissionId',
        as: 'permissions',
        timestamps: false
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
