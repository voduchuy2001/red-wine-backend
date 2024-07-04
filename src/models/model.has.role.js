import { Model } from 'sequelize'

const ModelHasRole = (sequelize, DataTypes) => {
  class ModelHasRole extends Model {
    static associate(models) {}
  }
  ModelHasRole.init(
    {
      modelId: DataTypes.BIGINT,
      modelType: DataTypes.STRING,
      roleId: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'ModelHasRole',
      timestamps: false
    }
  )
  return ModelHasRole
}

export default ModelHasRole
