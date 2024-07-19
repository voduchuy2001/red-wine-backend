import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, {
        through: {
          model: models.ModelHasRole,
          scope: {
            modelType: 'user'
          }
        },
        foreignKey: 'modelId',
        as: 'roles'
      })

      this.belongsToMany(models.Permission, {
        through: {
          model: models.ModelHasPermission,
          scope: {
            modelType: 'user'
          }
        },
        foreignKey: 'modelId',
        as: 'permissions'
      })
    }
  }
  User.init(
    {
      avatar: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      lastLoginAt: DataTypes.DATE,
      emailVerifiedAt: DataTypes.DATE,
      dob: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  return User
}
