import db from '@models'
import BaseRepository from '@repositories/base.repository'

class UserRepository extends BaseRepository {
  constructor() {
    super(db.User)
  }

  async findByEmail(email) {
    return this.find({ email })
  }

  async getPermissions(id) {
    return this.findById(id, [
      {
        model: db.Role,
        as: 'roles',
        attributes: ['id', 'name', 'code'],
        required: false,
        include: {
          model: db.Permission,
          as: 'permissions',
          attributes: ['id', 'code', 'name', 'description'],
          required: false,
          through: { attributes: [] }
        }
      },
      {
        model: db.Permission,
        as: 'permissions',
        attributes: ['id', 'code', 'name', 'description'],
        required: false,
        through: { attributes: [] }
      }
    ])
  }

  async updateLastLoginAt(id) {
    const current = new Date()
    return this.update({ id }, { lastLoginAt: current })
  }

  async auth(id) {
    return this.find({ id }, [
      {
        model: db.Role,
        as: 'roles',
        attributes: ['id', 'name', 'code'],
        required: false,
        include: {
          model: db.Permission,
          as: 'permissions',
          attributes: ['id', 'code', 'name', 'description'],
          required: false,
          through: { attributes: [] }
        }
      },
      {
        model: db.Permission,
        as: 'permissions',
        attributes: ['id', 'code', 'name', 'description'],
        required: false,
        through: { attributes: [] }
      }
    ])
  }
}

export default UserRepository
