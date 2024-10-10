import bcrypt from 'bcryptjs'

class Bcrypt {
  constructor() {
    this.SALT = process.env.BCRYPT_ROUNDS || 10
  }

  async hash(password) {
    return bcrypt.hash(password, this.SALT)
  }

  async compare(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }
}

export default new Bcrypt()
