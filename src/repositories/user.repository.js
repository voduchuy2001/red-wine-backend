import db from '@models/index'
import BaseRepository from '@repositories/base.repository'

export default class UserRepository extends BaseRepository {
  constructor() {
    super(db.User)
  }

  async getAllPermissions(userId) {
    return await super.findOne({
      where: {
        id: userId
      },
      attributes: ['id'],
      include: [
        {
          model: db.Role,
          as: 'roles',
          attributes: ['id'],
          required: false,
          include: {
            model: db.Permission,
            as: 'permissions',
            attributes: ['id', 'code'],
            required: false
          }
        },
        {
          model: db.Permission,
          as: 'permissions',
          attributes: ['id', 'code'],
          required: false
        }
      ]
    })
  }
}
