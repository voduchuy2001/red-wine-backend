'use strict'

import { Model } from 'sequelize'

class User extends Model {
  static associate({ Permission, Role, PasswordResetToken }) {
    this.belongsToMany(Role, {
      through: {
        model: 'ModelHasRoles',
        scope: {
          modelType: 'User'
        }
      },
      foreignKey: 'modelId',
      as: 'roles',
      timestamps: false
    })

    this.hasMany(PasswordResetToken, {
      foreignKey: 'email',
      as: 'resetPasswordTokens'
    })

    this.belongsToMany(Permission, {
      through: {
        model: 'ModelHasPermissions',
        scope: {
          modelType: 'User'
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
      modelName: 'User',
      tableName: 'Users'
    }
  )
  return User
}
