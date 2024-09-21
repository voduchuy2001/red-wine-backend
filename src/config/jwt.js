import 'dotenv/config'
import jwt from 'jsonwebtoken'

class JWT {
  static generate(data, expiresIn = '15m') {
    const key = process.env.JWT_SECRET_KEY

    return jwt.sign({ data }, key, { expiresIn })
  }
}

export default JWT
