import { Model } from 'sequelize'

class User extends Model {
  static associate({ Permission, Role }) {
    this.belongsToMany(Role, {
      through: {
        model: 'ModelHasRoles',
        scope: {
          modelType: 'user'
        }
      },
      foreignKey: 'modelId',
      as: 'roles',
      timestamps: false
    })

    this.belongsToMany(Permission, {
      through: {
        model: 'ModelHasPermissions',
        scope: {
          modelType: 'user'
        }
      },
      foreignKey: 'modelId',
      as: 'permissions',
      timestamps: false
    })
  }
}

export default (sequelize, { DATE, STRING }) => {
  User.init(
    {
      avatar: STRING,
      name: STRING,
      email: STRING,
      password: STRING,
      lastLoginAt: DATE,
      emailVerifiedAt: DATE,
      dob: DATE
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  return User
}
