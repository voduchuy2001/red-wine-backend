'use strict'

import { Model } from 'sequelize'

class Contact extends Model {
  static associate(models) {}
}

export default (sequelize, { STRING, TEXT }) => {
  Contact.init(
    {
      name: STRING,
      email: STRING,
      phone: STRING,
      address: STRING,
      subject: STRING,
      content: TEXT,
      status: STRING
    },
    {
      sequelize,
      modelName: 'Contact',
      tableName: 'Contacts'
    }
  )
  return Contact
}
