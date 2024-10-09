'use strict'

import { Model } from 'sequelize'

class Contact extends Model {
  static associate(models) {}
}

export default (sequelize, DataTypes) => {
  Contact.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      subject: DataTypes.STRING,
      content: DataTypes.TEXT,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Contact',
      tableName: 'Contacts'
    }
  )
  return Contact
}
