import GOOGLE_SERVICE from '@config/services'
import JWT from '@config/jwt'
import { OAuth2Client } from 'google-auth-library'
import SystemException from '@exceptions/system.exception'
import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import RedisCache from '@config/cache'
import { v4 as uuidv4 } from 'uuid'
import BaseService from '@services/base.service'
import db from '@models/index'

class GoogleOAuthService extends BaseService {
  constructor(userRepository) {
    super(userRepository)
    this.userRepository = userRepository
    this.oAuth2Client = new OAuth2Client(
      GOOGLE_SERVICE.clientID,
      GOOGLE_SERVICE.clientSecret,
      GOOGLE_SERVICE.callbackURL
    )
  }

  async redirect() {
    const scope = ['https://www.googleapis.com/auth/userinfo.profile', 'email']

    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope,
      prompt: 'consent'
    })
  }

  async callback(code) {
    try {
      const tokenResponse = await this.oAuth2Client.getToken(code)
      const idToken = tokenResponse.tokens.id_token
      const verifiedPayload = await this.oAuth2Client.verifyIdToken({ idToken })
      const socialAccount = verifiedPayload.getPayload()
      const { email, name, picture } = socialAccount

      const userAccount = await this.registerOrUpdateUser(email, name, picture)
      const userId = userAccount.id
      const accessToken = JWT.generate(userId, '30m')
      const sessionId = 'session-' + uuidv4()
      const refreshToken = JWT.generate({ userId, sessionId }, '7d', 'refreshToken')
      await RedisCache.set(`auth:user:${userId}:${sessionId}`, refreshToken, 7 * 24 * 60 * 60)
      return { accessToken, refreshToken, sessionId }
    } catch (error) {
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async registerOrUpdateUser(email, name, picture) {
    const transaction = await db.sequelize.transaction()

    try {
      const { record: user } = await this.firstOrCreate({ email }, { email, name, avatar: picture }, transaction)
      const current = new Date()
      await user.update({ lastLoginAt: current }, { transaction })
      await transaction.commit()
      return user
    } catch (error) {
      await transaction.rollback()
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

export default GoogleOAuthService
