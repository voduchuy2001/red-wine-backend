import { Model } from 'sequelize'

class Role extends Model {
  static associate({ Permission, User }) {
    this.belongsToMany(User, {
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

    this.belongsToMany(Permission, {
      through: 'RoleHasPermissions',
      foreignKey: 'roleId',
      otherKey: 'permissionId',
      as: 'permissions',
      timestamps: false
    })
  }
}

export default (sequelize, { STRING }) => {
  Role.init(
    {
      name: STRING,
      code: STRING,
      description: STRING
    },
    {
      sequelize,
      modelName: 'Role'
    }
  )
  return Role
}
