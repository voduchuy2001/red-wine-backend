export const MAIL_CONFIGURATION = {
  service: process.env.MAIL_SERVICE,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
}
