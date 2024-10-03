import bcrypt from 'bcryptjs'

class Bcrypt {
  constructor() {
    this.SALT = process.env.BCRYPT_ROUNDS || 10
  }

  async hashPassword(password) {
    return bcrypt.hash(password, this.SALT)
  }

  async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }
}

export default new Bcrypt()
