import { GOOGLE_SERVICE } from '@config/services'
import JWT from '@utils/jwt'
import { OAuth2Client } from 'google-auth-library'

export default class GoogleOAuthService {
  constructor(userRepository) {
    this.userRepository = userRepository
    this.oAuth2Client = new OAuth2Client(
      GOOGLE_SERVICE.clientID,
      GOOGLE_SERVICE.clientSecret,
      GOOGLE_SERVICE.callbackURL
    )
  }

  async redirect() {
    console.log('checkeddd')
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
      const loggedInUser = userAccount.get({ plain: true })
      delete loggedInUser.password

      loggedInUser.token = JWT.generate(userAccount.id, '7d')

      return loggedInUser
    } catch (error) {
      console.log(error.message)
      return false
    }
  }

  async registerOrUpdateUser(email, name, picture) {
    let user = await this.userRepository.findOne({ where: { email } })

    if (!user) user = await this.userRepository.create({ email, name, avatar: picture })

    user.update({ lastLoginAt: new Date() })
    await user.save()

    return user
  }
}
