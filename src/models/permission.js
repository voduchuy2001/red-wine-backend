import { Model } from 'sequelize'

class Permission extends Model {
  static associate({ Role, User }) {
    this.belongsToMany(Role, {
      through: 'RoleHasPermissions',
      foreignKey: 'permissionId',
      otherKey: 'roleId',
      as: 'roles',
      timestamps: false
    })

    this.belongsToMany(User, {
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

export default (sequelize, { STRING }) => {
  Permission.init(
    {
      name: STRING,
      code: STRING,
      description: STRING
    },
    {
      sequelize,
      modelName: 'Permission'
    }
  )
  return Permission
}
