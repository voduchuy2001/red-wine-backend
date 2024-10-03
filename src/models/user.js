'use strict'

import { Model } from 'sequelize'

const PROTECTED_ATTRIBUTES = ['password']

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

  toJSON() {
    const attributes = Object.assign({}, this.get())
    for (let attribute of PROTECTED_ATTRIBUTES) {
      delete attributes[attribute]
    }
    return attributes
  }
}

export default (sequelize, { DATE, STRING }) => {
  User.init(
    {
      avatar: STRING,
      name: STRING,
      username: STRING,
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
