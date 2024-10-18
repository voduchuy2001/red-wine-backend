import { MAIL_CONFIGURATION } from '@constants/mail'
import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'
import ejs from 'ejs'
import { INTERNAL_SERVER_ERROR } from '@constants/http.status.code'
import SystemException from '@exceptions/system.exception'

class Mail {
  constructor(data) {
    this.data = data
    this.transporter = nodemailer.createTransport(MAIL_CONFIGURATION)
  }

  envelop() {
    return {
      from: this.data.from || process.env.MAIL_FROM_ADDRESS,
      to: this.data.to,
      subject: this.data.subject
    }
  }

  async content(template, context) {
    const templatePath = path.join(__dirname, `../views/mail/${template}.ejs`)
    const templateContent = fs.readFileSync(templatePath, 'utf8')
    return ejs.render(templateContent, context)
  }

  attachments() {
    return []
  }

  async send(template, context) {
    const mailOptions = {
      ...this.envelop(),
      html: await this.content(template, context),
      attachments: this.attachments()
    }

    try {
      await this.transporter.sendMail(mailOptions)
    } catch (error) {
      throw new SystemException(INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

export default Mail
