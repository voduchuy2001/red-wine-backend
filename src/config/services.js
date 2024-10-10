import 'dotenv/config'

const GOOGLE_SERVICE = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URI
}

export default GOOGLE_SERVICE
