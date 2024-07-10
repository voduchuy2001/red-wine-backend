import SequelizePaginate from '@utils/paginate'
import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      const { Role, ModelHasRole, Permission, ModelHasPermission } = models

      this.belongsToMany(Role, {
        through: {
          model: ModelHasRole,
          scope: {
            modelType: 'user'
          }
        },
        foreignKey: 'modelId',
        as: 'roles'
      })

      this.belongsToMany(Permission, {
        through: {
          model: ModelHasPermission,
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

  SequelizePaginate.paginate(User)
  return User
}
