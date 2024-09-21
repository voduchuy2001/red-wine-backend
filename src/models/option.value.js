'use strict'
import { Model } from 'sequelize'

class OptionValue extends Model {
  static associate({ Variant }) {
    this.belongsToMany(Variant, { through: 'VariantOptions', as: 'variants', timestamps: false })
  }
}

export default (sequelize, { STRING }) => {
  OptionValue.init(
    {
      name: STRING
    },
    {
      sequelize,
      modelName: 'OptionValue'
    }
  )
  return OptionValue
}
