import bcrypt from 'bcryptjs'

class Bcrypt {
  constructor(SALT = 10) {
    this.SALT = SALT
  }

  async hashPassword(password) {
    return bcrypt.hash(password, this.SALT)
  }

  async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }
}

export default new Bcrypt()
